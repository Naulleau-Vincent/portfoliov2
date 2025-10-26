import { Router } from "express";
import rateLimit from "express-rate-limit";
import { signup, login, resendVerification, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { User } from "../models/User";
import { AUTH_SUCCESS, JWT_ERRORS } from "../constants/models";
import csrfProtection from "../middlewares/csrf";


const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/csrf-token", csrfProtection, (req, res) => {
  try {
    res.json({ csrfToken: (req as any).csrfToken() });
  } catch (err) {
    console.error("CSRF token error:", err);
    res.status(500).json({ error: "CSRF token generation failed" });
  }
});

router.post("/signup", csrfProtection, signup);
router.post("/login", loginLimiter, csrfProtection, login);
router.post("/resend-verification", csrfProtection, resendVerification);
router.post("/forgot-password", forgotLimiter, forgotPassword);
router.post("/reset-password", forgotLimiter, resetPassword);

router.get("/verify", async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });
  if (!user) return res.status(400).json({ ok: false, error: JWT_ERRORS.INVALID_TOKEN });
  if (user.isVerified) {
    return res.status(400).send(AUTH_SUCCESS.ACCOUNT_ALREADY_VERIFIED);
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.json({ message: AUTH_SUCCESS.ACCOUNT_VERIFIED });
});

export default router;
