import { NextFunction, Request, Response, RequestHandler } from "express";
import { UnauthorizedError } from "../Errors/unauthorizedError";
import { UserProjectModel } from "../models/schema/User_Project";

// Middleware للتحقق من صلاحيات عامة حسب الدور على النظام
export const authorizeRoles = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      throw new UnauthorizedError(`Access denied for role: ${req.user?.role}`);
    }
    next();
  };
};

// // Middleware للتحقق من صلاحيات المستخدم داخل مشروع معين
// export const authorizeRoleAtProject = (roles: string[]): RequestHandler => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // احصل على userId من الـ JWT أو من body
//       const userId = req.user?._id?.toString() || req.body?.userId;
//       // احصل على projectId من params أو body
//       const projectId = req.params?.project_id || req.body?.project_id;

//       // التحقق من وجود القيم
//       if (!userId || !projectId) {
//         throw new UnauthorizedError("User ID or Project ID missing");
//       }

//       // السماح للسوبر أدمين بتخطي كل شيء
//       if (req.user?.role === "SuperAdmin") return next();
//       // السماح للـ admin على مستوى النظام بتخطي كل المشاريع
//       if (req.user?.role === "admin") return next();

//       // التأكد من علاقة المستخدم بالمشروع
//       const userProject = await UserProjectModel.findOne({
//         userId: userId,
//         project_id: projectId,
//       });

//       if (!userProject) throw new UnauthorizedError("User is not a member of the project");

//       // التحقق من الدور داخل المشروع
//       if (!userProject.role || !roles.includes(userProject.role)) {
//         throw new UnauthorizedError("You do not have permission for this action");
//       }

//       next();
//     } catch (err) {
//       next(err);
//     }
//   };
// };
