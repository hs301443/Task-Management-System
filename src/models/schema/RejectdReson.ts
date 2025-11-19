import mongoose, { Schema } from "mongoose";

export interface RejectedReson extends Document {
    reason: string;
    points: number;
}

const RejectdResonSchema = new Schema<RejectedReson> ({
    reason: { type: String, required: true },
    points: { type: Number, required: true },
}, { timestamps: true });

export const RejectedReson = mongoose.model<RejectedReson>('RejectedReson', RejectdResonSchema);