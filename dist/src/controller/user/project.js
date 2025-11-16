"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.getUserProjects = void 0;
const BadRequest_1 = require("../../Errors/BadRequest");
const NotFound_1 = require("../../Errors/NotFound");
const response_1 = require("../../utils/response");
const User_Project_1 = require("../../models/schema/User_Project");
const User_1 = require("../../models/schema/auth/User");
const getUserProjects = async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new BadRequest_1.BadRequest("User ID is required");
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new NotFound_1.NotFound("User not found");
    }
    const projects = await User_Project_1.UserProjectModel.find({ user_id: userId }).populate("project_id", "name");
    return (0, response_1.SuccessResponse)(res, { message: "Projects fetched successfully", projects });
};
exports.getUserProjects = getUserProjects;
const getProjectById = async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
        throw new BadRequest_1.BadRequest("User ID is required");
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new NotFound_1.NotFound("User not found");
    }
    if (!projectId) {
        throw new BadRequest_1.BadRequest("Project ID is required");
    }
    const project = await User_Project_1.UserProjectModel.findOne({ user_id: userId, project_id: projectId }).populate("project_id", "name");
    (0, response_1.SuccessResponse)(res, { message: "Project fetched successfully", project });
};
exports.getProjectById = getProjectById;
