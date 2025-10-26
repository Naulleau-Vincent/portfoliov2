import { Router } from "express";
import rateLimit from "express-rate-limit";
import { contact } from "../controllers/contact.controller";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,                
  message: { ok: false, error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/contact", contactLimiter, contact);

export default router;
