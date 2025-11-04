"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    BaseImage64: { type: String },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String },
    fcmtoken: { type: String },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
