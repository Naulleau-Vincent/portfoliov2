import mongoose from "mongoose";
import { MODEL_NAMES, USER_ROLES } from "../constants/models";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: USER_ROLES.USER },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false }
});

export const User = mongoose.model(MODEL_NAMES.USER, userSchema);
