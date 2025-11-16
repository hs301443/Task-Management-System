
import mongoose from "mongoose";
import { Request, Response } from "express";
import { ProjectModel } from "../../models/schema/project";
import { BadRequest } from "../../Errors/BadRequest";
import { NotFound } from "../../Errors/NotFound";
import { UnauthorizedError } from "../../Errors/unauthorizedError";
import { SuccessResponse } from "../../utils/response";
import { UserProjectModel } from "../../models/schema/User_Project";
import { User } from "../../models/schema/auth/User";
import { TaskModel } from "../../models/schema/Tasks";
import { UserTaskModel } from "../../models/schema/User_Task";

export const getUserTasksByProject = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { project_id } = req.params;

  if (!userId || !project_id) throw new BadRequest("User ID or Project ID missing");

  // التأكد أن اليوزر عضو في المشروع
  const userProject = await UserProjectModel.findOne({ user_id: userId, project_id });
  if (!userProject) throw new NotFound("User is not part of this project");

  // جلب كل المهام الخاصة باليوزر في المشروع
  const tasks = await UserTaskModel.find({ user_id: userId })
    .populate({
      path: "task_id",
      match: { project_id: project_id } // فلترة على المشروع
    });

  const userTasks = tasks.filter(t => t.task_id !== null);

  SuccessResponse(res, { message: "User tasks fetched successfully", userTasks });
};

export const updateUserTaskStatus = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { taskId } = req.params;
  const { status } = req.body;

  if (!userId || !taskId || !status) throw new BadRequest("Missing required fields");

  const userTask = await UserTaskModel.findOne({ task_id: taskId, user_id: userId });
  if (!userTask) throw new NotFound("Task not found");

  // السماح فقط بتغيير الحالة خطوة خطوة: pending → in_progress → done
  const allowedTransitions: Record<string, string> = {
    pending: "in_progress",
    in_progress: "done"
  };

  if (userTask.status === "done" || userTask.status === "Approved" || userTask.status === "rejected") {
    throw new BadRequest("Cannot change status of tasks that are done, Approved or Rejected");
  }

if (allowedTransitions[userTask?.status as keyof typeof allowedTransitions] !== status) {
  throw new BadRequest(`Invalid status transition. You can only move from ${userTask?.status ?? 'undefined'} to ${allowedTransitions[userTask?.status as keyof typeof allowedTransitions]}`);
}
  userTask.status = status;
  await userTask.save();

  SuccessResponse(res, { message: `Task status updated to ${status}`, userTask });
};
