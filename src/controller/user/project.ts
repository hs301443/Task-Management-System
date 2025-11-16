
import mongoose from "mongoose";
import { Request, Response } from "express";
import { ProjectModel } from "../../models/schema/project";
import { BadRequest } from "../../Errors/BadRequest";
import { NotFound } from "../../Errors/NotFound";
import { UnauthorizedError } from "../../Errors/unauthorizedError";
import { SuccessResponse } from "../../utils/response";
import { UserProjectModel } from "../../models/schema/User_Project";
import { User } from "../../models/schema/auth/User";
export const getUserProjects = async (req: Request, res: Response) => {
   const userId=req.user?._id;

    if (!userId) {
        throw new BadRequest("User ID is required");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFound("User not found");
    }
    const projects = await UserProjectModel.find({ user_id: userId }).populate("project_id", "name");
    return SuccessResponse(res, { message: "Projects fetched successfully", projects });
};


export const getProjectById = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
        throw new BadRequest("User ID is required");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFound("User not found");
    }
    if (!projectId) {
        throw new BadRequest("Project ID is required");
    }
    const project = await UserProjectModel.findOne({ user_id: userId, project_id: projectId }).populate("project_id", "name");
     SuccessResponse(res, { message: "Project fetched successfully", project });
};