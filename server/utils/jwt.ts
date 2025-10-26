import jwt from "jsonwebtoken";
import { JWT_CONFIG, JWT_ERRORS } from "../constants/models";

export function signJwt(payload: object) {
  const secret: string = process.env.JWT_SECRET!;
  if (!secret) throw new Error(JWT_ERRORS.NOT_SET);
  return jwt.sign(payload, secret, { 
    algorithm: JWT_CONFIG.ALGORITHM,
    expiresIn: JWT_CONFIG.EXPIRES_IN 
  });
}

export function verifyJwt<T>(token: string): T | null {
  const secret: string = process.env.JWT_SECRET!;
  if (!secret) throw new Error(JWT_ERRORS.NOT_SET);
  try {
    return jwt.verify(token, secret, { algorithms: [JWT_CONFIG.ALGORITHM] }) as T;
  } catch {
    return null;
  }
}
