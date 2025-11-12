"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const unauthorizedError_1 = require("../Errors/unauthorizedError");
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log("🔍 user from token:", req.user); // ✅ اطبع بيانات المستخدم
        console.log("🔍 allowed roles:", roles);
        if (!req.user?.role || !roles.includes(req.user.role)) {
            throw new unauthorizedError_1.UnauthorizedError(`Access denied for role: ${req.user?.role}`);
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
