"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserTaskStatus = exports.getUserTasksByProject = void 0;
const BadRequest_1 = require("../../Errors/BadRequest");
const NotFound_1 = require("../../Errors/NotFound");
const response_1 = require("../../utils/response");
const User_Project_1 = require("../../models/schema/User_Project");
const User_Task_1 = require("../../models/schema/User_Task");
const getUserTasksByProject = async (req, res) => {
    const userId = req.user?.id;
    const { project_id } = req.params;
    if (!userId || !project_id)
        throw new BadRequest_1.BadRequest("User ID or Project ID missing");
    // التأكد أن اليوزر عضو في المشروع
    const userProject = await User_Project_1.UserProjectModel.findOne({ user_id: userId, project_id });
    if (!userProject)
        throw new NotFound_1.NotFound("User is not part of this project");
    // جلب كل المهام الخاصة باليوزر في المشروع
    const tasks = await User_Task_1.UserTaskModel.find({ user_id: userId })
        .populate({
        path: "task_id",
        match: { project_id: project_id } // فلترة على المشروع
    });
    const userTasks = tasks.filter(t => t.task_id !== null);
    (0, response_1.SuccessResponse)(res, { message: "User tasks fetched successfully", userTasks });
};
exports.getUserTasksByProject = getUserTasksByProject;
const updateUserTaskStatus = async (req, res) => {
    const userId = req.user?.id;
    const { taskId } = req.params;
    const { status } = req.body;
    if (!userId || !taskId || !status)
        throw new BadRequest_1.BadRequest("Missing required fields");
    const userTask = await User_Task_1.UserTaskModel.findOne({ task_id: taskId, user_id: userId });
    if (!userTask)
        throw new NotFound_1.NotFound("Task not found");
    // السماح فقط بتغيير الحالة خطوة خطوة: pending → in_progress → done
    const allowedTransitions = {
        pending: "in_progress",
        in_progress: "done"
    };
    if (userTask.status === "done" || userTask.status === "Approved" || userTask.status === "rejected") {
        throw new BadRequest_1.BadRequest("Cannot change status of tasks that are done, Approved or Rejected");
    }
    if (allowedTransitions[userTask?.status] !== status) {
        throw new BadRequest_1.BadRequest(`Invalid status transition. You can only move from ${userTask?.status ?? 'undefined'} to ${allowedTransitions[userTask?.status]}`);
    }
    userTask.status = status;
    await userTask.save();
    (0, response_1.SuccessResponse)(res, { message: `Task status updated to ${status}`, userTask });
};
exports.updateUserTaskStatus = updateUserTaskStatus;
