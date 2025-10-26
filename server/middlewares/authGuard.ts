import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function authGuard(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyJwt<{ id: string; role: string }>(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = payload;
  next();
}
