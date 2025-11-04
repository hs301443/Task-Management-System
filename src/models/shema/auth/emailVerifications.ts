import mongoose, { Types } from 'mongoose';
import { UserModel } from './User';

interface EmailVerificationDocument extends mongoose.Document {
  userId: Types.ObjectId;
  verificationCode: string;
  expiresAt: Date;
}
const EmailVerificationSchema = new mongoose.Schema<EmailVerificationDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const EmailVerificationModel = mongoose.model<EmailVerificationDocument>("EmailVerification", EmailVerificationSchema);
