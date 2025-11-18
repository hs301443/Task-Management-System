
import mongoose from "mongoose";
import { Request, Response } from "express";
import { ProjectModel } from "../../models/schema/project";
import { BadRequest } from "../../Errors/BadRequest";
import { NotFound } from "../../Errors/NotFound";
import { UnauthorizedError } from "../../Errors/unauthorizedError";
import { SuccessResponse } from "../../utils/response";
import { UserProjectModel } from "../../models/schema/User_Project";
import { User } from "../../models/schema/auth/User";
import { UserTaskModel } from "../../models/schema/User_Task";
import { sendEmail } from "../../utils/sendEmails";
export const getProjectDetailsForUser = async (req: Request, res: Response) => {
  const userId = req.user?._id; // استخدم _id من الـ user
  const { project_id } = req.params;

  if (!userId || !project_id) throw new BadRequest("User ID or Project ID missing");

  // التأكد أن المستخدم عضو في المشروع
  const isMember = await UserProjectModel.findOne({ userId, project_id });
  if (!isMember) throw new UnauthorizedError("You are not part of this project");

  // جلب بيانات المشروع
  const project = await ProjectModel.findById(project_id);
  if (!project) throw new NotFound("Project not found");

  // جلب أعضاء المشروع
  const members = await UserProjectModel.find({ project_id })
    .populate("userId", "name email photo role"); // populate مع الحقل الصحيح

  // جلب مهام المستخدم داخل المشروع
  const tasks = await UserTaskModel.find({ userId })
    .populate({
      path: "task_id",
      match: { projectId: project_id } // فلترة على المشروع
    });

  SuccessResponse(res, {
    message: "Project details retrieved",
    project,
    members,
    tasks
  });
};



export const getallProject = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const projects = await UserProjectModel.find({ userId }).populate("project_id", "name");
    return SuccessResponse(res, { message: "Projects fetched successfully", projects });

};

export const addUserToProject = async (req: Request, res: Response) => {
 const userpremision =req.user?._id;
 if(!userpremision) throw new UnauthorizedError("You are not authorized to perform this action");
 let useratproject =await UserProjectModel.findOne({userId:userpremision})
 if(useratproject?.role !== "administrator") throw new UnauthorizedError("You are not authorized to perform this action");
  const { userId, project_id, role } = req.body;
  const roles = role || "Member"; // اختر قيمة موجودة في enum

  if (!userId || !project_id) {
    throw new BadRequest("Missing required fields");
  }

  // Check user exists
  const user = await User.findById(userId);
  if (!user) throw new NotFound("User not found");

  // Check project exists
  const project = await ProjectModel.findById(project_id);
  if (!project) throw new NotFound("Project not found");

  // Prevent duplication
  const exists = await UserProjectModel.findOne({ userId, project_id });
  if (exists) throw new BadRequest("User already added to this project");

  // Add user to project
  const userProject = await UserProjectModel.create({
    userId,
    project_id,
    email: user.email, // مهم
    role: roles,       // لازم يكون enum صحيح
  });

    await sendEmail(
      user.email,
      `You have been added to the project: ${project.name}`,
      `
Hello ${user.name},

You have been added to a new project.

Project Name: ${project.name}
Your Role: ${roles}

Best regards,
Task Management System
`
    );
 

  SuccessResponse(res, {
    message: "User added to project successfully",
    userProject,
  });
};

export const getUsersByProject = async (req: Request, res: Response) => {
   const userpremision =req.user?._id;
 if(!userpremision) throw new UnauthorizedError("You are not authorized to perform this action");
 let useratproject =await UserProjectModel.findOne({userId:userpremision})
 if(useratproject?.role !== "administrator") throw new UnauthorizedError("You are not authorized to perform this action");

  const { project_id  } = req.params;
  if (!project_id ) throw new BadRequest("Project ID is required");

  const users = await UserProjectModel.find({ project_id  }).populate("userId", "name email photo");

  return SuccessResponse(res, { message: "Users fetched successfully", users });
};


export const deleteUserFromProject = async (req: Request, res: Response) => {
   const userpremision =req.user?._id;
 if(!userpremision) throw new UnauthorizedError("You are not authorized to perform this action");
 let useratproject =await UserProjectModel.findOne({userId:userpremision})
 if(useratproject?.role !== "administrator") throw new UnauthorizedError("You are not authorized to perform this action");

  const { userId, project_id } = req.params;
  if (!userId || !project_id) throw new BadRequest("User ID and Project ID are required");

  const userProject = await UserProjectModel.findOneAndDelete({ userId, project_id });
  if (!userProject) throw new NotFound("User not found in project");

  return SuccessResponse(res, { message: "User removed from project successfully", userProject });
};

export const updateUserRole = async (req: Request, res: Response) => {
   const userpremision =req.user?._id;
 if(!userpremision) throw new UnauthorizedError("You are not authorized to perform this action");
 let useratproject =await UserProjectModel.findOne({userId:userpremision})
 if(useratproject?.role !== "administrator") throw new UnauthorizedError("You are not authorized to perform this action");

  const { userId, project_id } = req.params;
  const { role } = req.body;
  if (!userId || !project_id || !role) throw new BadRequest("User ID, Project ID, and Role are required");

  const userProject = await UserProjectModel.findOneAndUpdate(
    { userId, project_id },
    { role },
    { new: true }
  );

  if (!userProject) throw new NotFound("User not found in project");

  return SuccessResponse(res, { message: "User role updated successfully", userProject });
};
