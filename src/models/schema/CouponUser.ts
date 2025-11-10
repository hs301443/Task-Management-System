import mongoose from "mongoose";

const CouponUserschema= new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    codeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode', required: true },
}, { timestamps: true });

export const CouponUserModel = mongoose.model('CouponUser', CouponUserschema);