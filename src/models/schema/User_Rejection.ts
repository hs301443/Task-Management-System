import mongoose, { Schema, Document } from "mongoose";

export interface IUserRejectedReason extends Document {
  userId: mongoose.ObjectId;
  reasonId: mongoose.ObjectId;  // RejectedReson ID
  taskId: mongoose.ObjectId;
  createdAt: Date;
}

const UserRejectedReasonSchema = new Schema<IUserRejectedReason>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reasonId: { type: Schema.Types.ObjectId, ref: "RejectedReson", required: true },
    taskId:{ type: Schema.Types.ObjectId, ref: "Task", required: true },
  },
  { timestamps: true }
);

export const UserRejectedReason = mongoose.model<IUserRejectedReason>(
  "UserRejectedReason",
  UserRejectedReasonSchema
);
