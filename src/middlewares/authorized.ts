import { NextFunction, Request, Response, RequestHandler } from "express";
import { UnauthorizedError } from "../Errors/unauthorizedError";
import { UserProjectModel } from "../models/schema/User_Project";
import { UserTaskModel } from "../models/schema/User_Task";
import mongoose from "mongoose";

// Middleware للتحقق من صلاحيات عامة حسب الدور على النظام
export const authorizeRoles = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role ?? "";
    if (!role || !roles.includes(role)) {
      throw new UnauthorizedError(`Access denied for role: ${req.user?.role}`);
    }
    next();
  };
};


export const checkProjectOrTaskRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const role = req.user?.role ?? "";

      if (!userId) throw new UnauthorizedError("Unauthorized");

      // Admin bypass
      if (role.toLowerCase() === "admin") return next();

      if (role.toLowerCase() !== "user") {
        throw new UnauthorizedError("Only admin or user can access");
      }

      let projectRole: string | null = null;
      let taskRole: string | null = null;

      // 🔹 فقط تحقق من projectId لو موجود
      if (req.params?.project_id && mongoose.Types.ObjectId.isValid(req.params.project_id)) {
        const userProject = await UserProjectModel.findOne({
          user_id: new mongoose.Types.ObjectId(userId),
          project_id: new mongoose.Types.ObjectId(req.params.project_id),
        });
        projectRole = userProject?.role || null;
      }

      // 🔹 فقط تحقق من taskId لو موجود
      if (req.params?.taskId && mongoose.Types.ObjectId.isValid(req.params.taskId)) {
        const userTask = await UserTaskModel.findOne({
          user_id: new mongoose.Types.ObjectId(userId),
          task_id: new mongoose.Types.ObjectId(req.params.taskId),
        });
        taskRole = userTask?.role || null;
      }

      // لو مفيش project ولا task → دخول بدون checks
      if (!req.params?.project_id && !req.params?.taskId) {
        return next();
      }

      const allowedRolesLower = allowedRoles.map(r => r.toLowerCase());
      const isAllowed =
        (projectRole && allowedRolesLower.includes(projectRole.toLowerCase())) ||
        (taskRole && allowedRolesLower.includes(taskRole.toLowerCase()));

        console.log(isAllowed);
        console.log(allowedRolesLower);
        console.log(projectRole);
        console.log(taskRole);
      
        if (!isAllowed) {
        throw new UnauthorizedError(
          `Access denied. Allowed roles: ${allowedRoles.join(", ")}`
        );
      }


      res.locals.userProjectRole = projectRole;
      res.locals.userTaskRole = taskRole;

      next();
    } catch (err) {
      next(err);
    }
  };
};
