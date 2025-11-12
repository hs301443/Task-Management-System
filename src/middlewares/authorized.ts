import { NextFunction, Request, Response, RequestHandler } from "express";
import { UnauthorizedError } from "../Errors/unauthorizedError";

export const authorizeRoles = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("🔍 user from token:", req.user); // ✅ اطبع بيانات المستخدم
    console.log("🔍 allowed roles:", roles);

    if (!req.user?.role || !roles.includes(req.user.role)) {
      throw new UnauthorizedError(`Access denied for role: ${req.user?.role}`);
    }
    next();
  };
};
