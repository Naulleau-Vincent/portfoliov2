import { Request, Response } from "express";
import * as argon2 from "argon2";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { User } from "../models/User";
import {
  USER_ROLES,
  ARGON_OPTS,
  AUTH_ERRORS,
  SIGNUP_SCHEMA,
  LOGIN_SCHEMA,
  AUTH_SUCCESS,
  NODE_ENV
} from "../constants/models";
import { signJwt } from "../utils/jwt";
import { loadEmailTemplate } from "../emails";

function withPepper(password: string) {
  return process.env.PASSWORD_PEPPER
    ? password + process.env.PASSWORD_PEPPER
    : password;
}

function generateCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function sendVerificationEmail(email: string, token: string) {
  const htmlContent = loadEmailTemplate("verifyEmail.html", {
    VERIFY_URL: `${process.env.FRONT_URL}/verify?token=${token}`
  });

  if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    console.log(`📧 [DEV] Verification link: ${process.env.FRONT_URL}/verify?token=${token}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  try {
    console.log(`[MAIL] Sending verification email to ${email}`);
    const info = await transporter.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: email,
      subject: "Verify your account",
      html: htmlContent
    });
    console.log("[MAIL] Verification mail sent");
  } catch (err) {
    console.error("[MAIL] Error sending verification email:", err);
  }
}


export async function resendVerification(req: Request, res: Response) {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: AUTH_ERRORS.INVALID_CREDENTIALS });
  }
  if (user.isVerified) {
    return res.status(400).json({ error: AUTH_SUCCESS.ACCOUNT_ALREADY_VERIFIED });
  }

  user.verificationToken = crypto.randomBytes(32).toString("hex");
  await user.save();

  await sendVerificationEmail(user.email, user.verificationToken);

  res.json({ message: AUTH_SUCCESS.VERIFICATION_EMAIL_SENT });
}

export async function signup(req: Request, res: Response) {
  const parsed = SIGNUP_SCHEMA.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: AUTH_ERRORS.INVALID_INPUT });
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const { email, password } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ error: AUTH_ERRORS.EMAIL_EXISTS });
  }

  const passwordHash = await argon2.hash(withPepper(password), ARGON_OPTS);

  const user = new User({
    email,
    passwordHash,
    role: USER_ROLES.USER,
    isVerified: false,
    verificationToken
  });
  await user.save();

  await sendVerificationEmail(email, verificationToken);

  const token = signJwt({ id: user._id, role: user.role });
  const csrfToken = generateCsrfToken();

  res.cookie("csrfToken", csrfToken, {
    httpOnly: false, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.json({
    token,
    csrfToken,
    user: { id: user._id, email: user.email, role: user.role }
  });
}

export async function login(req: Request, res: Response) {
  const parsed = LOGIN_SCHEMA.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: AUTH_ERRORS.INVALID_INPUT });
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: AUTH_ERRORS.INVALID_CREDENTIALS });
  }
  if (!user.isVerified) {
    return res.status(403).json({ error: AUTH_ERRORS.ACCOUNT_NOTVERIFIED });
  }

  const valid = await argon2.verify(user.passwordHash, withPepper(password));
  if (!valid) {
    return res.status(401).json({ error: AUTH_ERRORS.INVALID_CREDENTIALS });
  }

  const token = signJwt({ id: user._id, role: user.role });
  const csrfToken = generateCsrfToken();

  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.json({
    token,
    csrfToken,
    user: { id: user._id, email: user.email, role: user.role }
  });
}

async function sendResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.FRONT_URL}/reset?token=${token}`;
  const html = loadEmailTemplate("resetPassword.html", { RESET_URL: resetUrl });

  if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    console.log(`🔗 Reset link: ${resetUrl}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });

  await transporter.sendMail({
    from: `${process.env.MAIL_USER}`,
    to: email,
    subject: "Reset your password",
    html,
  });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ error: AUTH_ERRORS.INVALID_INPUT });

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "If the email exists, a link was sent." });

  user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  await sendResetEmail(user.email, user.resetPasswordToken);
  return res.json({ message: "If the email exists, a link was sent." });
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as { token?: string; password?: string };
  if (!token || !password) return res.status(400).json({ error: AUTH_ERRORS.INVALID_INPUT });

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  user.passwordHash = await argon2.hash(withPepper(password), ARGON_OPTS);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.json({ message: "Password updated" });
}
