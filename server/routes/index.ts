import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import contactRoutes from "./contact.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/", contactRoutes);

export default router;
