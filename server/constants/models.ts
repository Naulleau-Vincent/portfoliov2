import * as argon2 from "argon2";
import { z } from "zod";

export const SIGNUP_SCHEMA = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const LOGIN_SCHEMA = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const CONTACT_SCHEMA = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional().default(""),
  captcha: z.string().trim().min(1)
});

export const CONTACT_SUCCESS = {
  SENT: "Message sent",
} as const;

export const CONTACT_ERRORS = {
  SEND_FAILED: "Failed to send email",
  INVALID_INPUT: "Invalid contact payload"
} as const;

export const MODEL_NAMES = {
  USER: "User",
  PRODUCT: "Product",
  ORDER: "Order"
} as const;

export const ARGON_OPTS = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

export const USER_ROLES = {
  USER: "user",
} as const;

export const AUTH_ERRORS = {
  EMAIL_EXISTS: "Email already registered",
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_INPUT : "Invalid input",
  ACCOUNT_NOTVERIFIED: "Account not verified"
} as const;

export const AUTH_SUCCESS = {
  ACCOUNT_VERIFIED: "Account verified!",
  ACCOUNT_ALREADY_VERIFIED: "Account is already verified",
  VERIFICATION_EMAIL_SENT: "A new verification email has been sent"
} as const;

export const JWT_CONFIG = {
  EXPIRES_IN: "7d",
  ALGORITHM : "HS512"
} as const;

export const JWT_ERRORS = {
  NOT_SET: "JWT_SECRET not set",
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_INPUT : "Invalid input",
  INVALID_TOKEN: ""
} as const;

export const EXPRESS_SETTINGS = {
  TRUST_PROXY: "trust proxy",
  PAYLOADS_LIMIT: "10kb"
} as const;

export const NODE_ENV = {
  PRODUCTION: "production",
  DEVELOPMENT: "development"
} as const;

export const CORS_ALLOWED = {
  PRODUCTION: "https://vincentnaulleau.ovh",
  DEVELOPMENT: "http://localhost:5173",
} as const;
