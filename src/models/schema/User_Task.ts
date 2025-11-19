import mongoose, { Schema, Document } from "mongoose";
import {  TaskStatus } from "./Tasks";

export interface IUserTask extends Document {
  userId: mongoose.Types.ObjectId;
  task_id: mongoose.Types.ObjectId;
  status?:'pending' | 'in_progress' | 'done' | 'Approved' | 'rejected' | 'Pending_edit' | 'in_progress_edit';
  rejection_reason:mongoose.Types.ObjectId;
}

const UserTaskSchema = new Schema<IUserTask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    status: {
      type: String,
     enum: ['pending', 'in_progress', 'done', 'pending_edit',"in_progress_edit", 'Approved', 'rejected'],
      required: true,
    },
    rejection_reason: {
      type: Schema.Types.ObjectId, // سبب الرفض لو الحالة rejected
      ref: "RejectedReson",

}
   
  },
  { timestamps: true }
);

export const UserTaskModel = mongoose.model<IUserTask>("User_Task", UserTaskSchema);
