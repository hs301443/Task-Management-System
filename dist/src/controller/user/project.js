"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.deleteUserFromProject = exports.getUsersByProject = exports.addUserToProject = exports.getallProject = exports.getProjectDetailsForUser = void 0;
const project_1 = require("../../models/schema/project");
const BadRequest_1 = require("../../Errors/BadRequest");
const NotFound_1 = require("../../Errors/NotFound");
const unauthorizedError_1 = require("../../Errors/unauthorizedError");
const response_1 = require("../../utils/response");
const User_Project_1 = require("../../models/schema/User_Project");
const User_1 = require("../../models/schema/auth/User");
const User_Task_1 = require("../../models/schema/User_Task");
const sendEmails_1 = require("../../utils/sendEmails");
const getProjectDetailsForUser = async (req, res) => {
    const userId = req.user?._id; // استخدم _id من الـ user
    const { project_id } = req.params;
    if (!userId || !project_id)
        throw new BadRequest_1.BadRequest("User ID or Project ID missing");
    // التأكد أن المستخدم عضو في المشروع
    const isMember = await User_Project_1.UserProjectModel.findOne({ userId, project_id });
    if (!isMember)
        throw new unauthorizedError_1.UnauthorizedError("You are not part of this project");
    // جلب بيانات المشروع
    const project = await project_1.ProjectModel.findById(project_id);
    if (!project)
        throw new NotFound_1.NotFound("Project not found");
    // جلب أعضاء المشروع
    const members = await User_Project_1.UserProjectModel.find({ project_id })
        .populate("userId", "name email photo role"); // populate مع الحقل الصحيح
    // جلب مهام المستخدم داخل المشروع
    const tasks = await User_Task_1.UserTaskModel.find({ userId })
        .populate({
        path: "task_id",
        match: { projectId: project_id } // فلترة على المشروع
    });
    (0, response_1.SuccessResponse)(res, {
        message: "Project details retrieved",
        project,
        members,
        tasks
    });
};
exports.getProjectDetailsForUser = getProjectDetailsForUser;
const getallProject = async (req, res) => {
    const userId = req.user?._id;
    const projects = await User_Project_1.UserProjectModel.find({ userId }).populate("project_id", "name");
    return (0, response_1.SuccessResponse)(res, { message: "Projects fetched successfully", projects });
};
exports.getallProject = getallProject;
const addUserToProject = async (req, res) => {
    const userpremision = req.user?._id;
    if (!userpremision)
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    let useratproject = await User_Project_1.UserProjectModel.findOne({ userId: userpremision });
    if (useratproject?.role !== "administrator")
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    const { userId, project_id, role } = req.body;
    const roles = role || "Member"; // اختر قيمة موجودة في enum
    if (!userId || !project_id) {
        throw new BadRequest_1.BadRequest("Missing required fields");
    }
    // Check user exists
    const user = await User_1.User.findById(userId);
    if (!user)
        throw new NotFound_1.NotFound("User not found");
    // Check project exists
    const project = await project_1.ProjectModel.findById(project_id);
    if (!project)
        throw new NotFound_1.NotFound("Project not found");
    // Prevent duplication
    const exists = await User_Project_1.UserProjectModel.findOne({ userId, project_id });
    if (exists)
        throw new BadRequest_1.BadRequest("User already added to this project");
    // Add user to project
    const userProject = await User_Project_1.UserProjectModel.create({
        userId,
        project_id,
        email: user.email, // مهم
        role: roles, // لازم يكون enum صحيح
    });
    await (0, sendEmails_1.sendEmail)(user.email, `You have been added to the project: ${project.name}`, `
Hello ${user.name},

You have been added to a new project.

Project Name: ${project.name}
Your Role: ${roles}

Best regards,
Task Management System
`);
    (0, response_1.SuccessResponse)(res, {
        message: "User added to project successfully",
        userProject,
    });
};
exports.addUserToProject = addUserToProject;
const getUsersByProject = async (req, res) => {
    const userpremision = req.user?._id;
    if (!userpremision)
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    let useratproject = await User_Project_1.UserProjectModel.findOne({ userId: userpremision });
    if (useratproject?.role !== "administrator")
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    const { project_id } = req.params;
    if (!project_id)
        throw new BadRequest_1.BadRequest("Project ID is required");
    const users = await User_Project_1.UserProjectModel.find({ project_id }).populate("userId", "name email photo");
    return (0, response_1.SuccessResponse)(res, { message: "Users fetched successfully", users });
};
exports.getUsersByProject = getUsersByProject;
const deleteUserFromProject = async (req, res) => {
    const userpremision = req.user?._id;
    if (!userpremision)
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    let useratproject = await User_Project_1.UserProjectModel.findOne({ userId: userpremision });
    if (useratproject?.role !== "administrator")
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    const { userId, project_id } = req.params;
    if (!userId || !project_id)
        throw new BadRequest_1.BadRequest("User ID and Project ID are required");
    const userProject = await User_Project_1.UserProjectModel.findOneAndDelete({ userId, project_id });
    if (!userProject)
        throw new NotFound_1.NotFound("User not found in project");
    return (0, response_1.SuccessResponse)(res, { message: "User removed from project successfully", userProject });
};
exports.deleteUserFromProject = deleteUserFromProject;
const updateUserRole = async (req, res) => {
    const userpremision = req.user?._id;
    if (!userpremision)
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    let useratproject = await User_Project_1.UserProjectModel.findOne({ userId: userpremision });
    if (useratproject?.role !== "administrator")
        throw new unauthorizedError_1.UnauthorizedError("You are not authorized to perform this action");
    const { userId, project_id } = req.params;
    const { role } = req.body;
    if (!userId || !project_id || !role)
        throw new BadRequest_1.BadRequest("User ID, Project ID, and Role are required");
    const userProject = await User_Project_1.UserProjectModel.findOneAndUpdate({ userId, project_id }, { role }, { new: true });
    if (!userProject)
        throw new NotFound_1.NotFound("User not found in project");
    return (0, response_1.SuccessResponse)(res, { message: "User role updated successfully", userProject });
};
exports.updateUserRole = updateUserRole;
