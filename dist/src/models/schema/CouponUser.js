"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CouponUserschema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    codeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'PromoCode', required: true },
}, { timestamps: true });
exports.CouponUserModel = mongoose_1.default.model('CouponUser', CouponUserschema);
