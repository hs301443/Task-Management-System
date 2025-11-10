import { Request,Response } from "express";
import { PlanModel } from "../../models/schema/plans";
import { SuccessResponse } from "../../utils/response";
import { NotFound } from "../../Errors";


export const getAllPlans = async (req: Request, res: Response) => {
    const plans = await PlanModel.find();
    return SuccessResponse(res, {message: "Plans fetched successfully", plans });
}

export const getPlanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const plan = await PlanModel.findById(id);
    if (!plan) {
        throw new NotFound("Plan not found");
    }
    return SuccessResponse(res, {message: "Plan fetched successfully" ,plan });
}
