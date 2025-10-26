import { RequestHandler } from "express";
import csrf from "csurf";
const isProd = process.env.NODE_ENV === "production";

const csrfProtection: RequestHandler = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProd ? "none" : "lax"
  },
});

export default csrfProtection;
