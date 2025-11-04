import mongoose, { Schema, Types } from "mongoose";

interface AdminDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  BaseImage64?: string;
}
const AdminSchema = new Schema<AdminDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    BaseImage64: { type: String },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model<AdminDocument>("Admin", AdminSchema);

