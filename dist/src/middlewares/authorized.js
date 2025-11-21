"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectOrTaskRole = exports.authorizeRoles = void 0;
const unauthorizedError_1 = require("../Errors/unauthorizedError");
const User_Project_1 = require("../models/schema/User_Project");
const User_Task_1 = require("../models/schema/User_Task");
const mongoose_1 = __importDefault(require("mongoose"));
// Middleware للتحقق من صلاحيات عامة حسب الدور على النظام
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const role = req.user?.role ?? "";
        if (!role || !roles.includes(role)) {
            throw new unauthorizedError_1.UnauthorizedError(`Access denied for role: ${req.user?.role}`);
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
const checkProjectOrTaskRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user?._id;
            const role = req.user?.role ?? "";
            if (!userId)
                throw new unauthorizedError_1.UnauthorizedError("Unauthorized");
            // Admin bypass
            if (role.toLowerCase() === "admin")
                return next();
            if (role.toLowerCase() !== "user") {
                throw new unauthorizedError_1.UnauthorizedError("Only admin or user can access");
            }
            let projectRole = null;
            let taskRole = null;
            // 🔹 فقط تحقق من projectId لو موجود
            if (req.params?.project_id && mongoose_1.default.Types.ObjectId.isValid(req.params.project_id)) {
                const userProject = await User_Project_1.UserProjectModel.findOne({
                    user_id: new mongoose_1.default.Types.ObjectId(userId),
                    project_id: new mongoose_1.default.Types.ObjectId(req.params.project_id),
                });
                projectRole = userProject?.role || null;
            }
            // 🔹 فقط تحقق من taskId لو موجود
            if (req.params?.taskId && mongoose_1.default.Types.ObjectId.isValid(req.params.taskId)) {
                const userTask = await User_Task_1.UserTaskModel.findOne({
                    user_id: new mongoose_1.default.Types.ObjectId(userId),
                    task_id: new mongoose_1.default.Types.ObjectId(req.params.taskId),
                });
                taskRole = userTask?.role || null;
            }
            // لو مفيش project ولا task → دخول بدون checks
            if (!req.params?.project_id && !req.params?.taskId) {
                return next();
            }
            const allowedRolesLower = allowedRoles.map(r => r.toLowerCase());
            const isAllowed = (projectRole && allowedRolesLower.includes(projectRole.toLowerCase())) ||
                (taskRole && allowedRolesLower.includes(taskRole.toLowerCase()));
            console.log(isAllowed);
            console.log(allowedRolesLower);
            console.log(projectRole);
            console.log(taskRole);
            if (!isAllowed) {
                throw new unauthorizedError_1.UnauthorizedError(`Access denied. Allowed roles: ${allowedRoles.join(", ")}`);
            }
            res.locals.userProjectRole = projectRole;
            res.locals.userTaskRole = taskRole;
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.checkProjectOrTaskRole = checkProjectOrTaskRole;
