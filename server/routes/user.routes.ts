import { Router } from "express";
import { authGuard, AuthRequest } from "../middlewares/authGuard";

const router = Router();

router.get("/me", authGuard, (req, res) => {
  const user = (req as AuthRequest).user;
  res.json({ user });
});

export default router;
