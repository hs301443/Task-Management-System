import mongoose from "mongoose";

export interface DepartmentDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
const DepartmentSchema = new mongoose.Schema<DepartmentDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const DepartmentModel = mongoose.model<DepartmentDocument>(
  "Department",
  DepartmentSchema
);