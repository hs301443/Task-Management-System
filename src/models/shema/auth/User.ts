import { model, Schema, Types } from "mongoose";
import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  BaseImage64?: string;
  isVerified: boolean;
  googleId?: string;
  fcmtoken?: string;
}
const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    BaseImage64: { type: String },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String },
    fcmtoken: { type: String },
  },
  { timestamps: true }
);
export const UserModel = model<UserDocument>("User", UserSchema);