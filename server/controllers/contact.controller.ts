import { Request, Response } from "express";
import nodemailer from "nodemailer";
import xss from "xss";
import fetch from "node-fetch";
import {
  CONTACT_SCHEMA,
  CONTACT_ERRORS,
  CONTACT_SUCCESS,
  NODE_ENV
} from "../constants/models";
import { loadEmailTemplate } from "../emails";

import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("RECAPTCHA_SECRET_KEY not set");

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });

  const data = (await res.json()) as RecaptchaResponse;
  console.log("🔎 reCAPTCHA response:", data);
  return data.success && (data.score ?? 0) >= 0.5;
}

export async function contact(req: Request, res: Response) {
  console.log("📥 Contact form received:", req.body);

  const parsed = CONTACT_SCHEMA.safeParse(req.body);
  if (!parsed.success) {
    console.error("❌ Invalid input:", parsed.error.format());
    return res.status(400).json({ error: CONTACT_ERRORS.INVALID_INPUT });
  }

  const isHuman = await verifyCaptcha(parsed.data.captcha);
  if (!isHuman) {
    console.error("❌ Captcha failed for:", parsed.data.email);
    return res.status(400).json({ error: "Captcha verification failed" });
  }

  const name = xss(parsed.data.name.trim());
  const email = xss(parsed.data.email.trim());
  const subject = xss(parsed.data.subject.trim());
  const message = xss(parsed.data.message.trim());
  const website = xss(parsed.data.website.trim());

  console.log("✅ Sanitized data:", { name, email, subject, message, website });

  if (website && website.length > 0) {
    console.warn("⚠️ Honeypot triggered by:", email);
    return res.json({ ok: true, message: CONTACT_SUCCESS.SENT });
  }

  const html = loadEmailTemplate("contactForward.html", {
    NAME: name,
    EMAIL: email,
    SUBJECT: subject,
    MESSAGE: message.replace(/\n/g, "<br/>"),
  });

  if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    console.log("📨 [DEV] Contact email would be sent:", { name, email, subject, message });
    return res.json({ ok: true, message: CONTACT_SUCCESS.SENT });
  }

console.log("📧 Preparing to send email with transporter…");

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,         
  secure: false,  
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

  try {
    const info = await transporter.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });

    console.log("✅ Mail sent successfully!");
    console.log("   From:", process.env.MAIL_USER);
    console.log("   To:", process.env.CONTACT_TO ?? process.env.MAIL_USER);
    console.log("   Subject:", subject);
    console.log("   MessageId:", info.messageId);

    return res.json({ ok: true, message: CONTACT_SUCCESS.SENT });
  } catch (err) {
    console.error("❌ Failed to send mail:", err);
    return res.status(500).json({ error: CONTACT_ERRORS.SEND_FAILED });
  }
}
