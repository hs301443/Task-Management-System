"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanById = exports.getAllPlans = void 0;
const plans_1 = require("../../models/schema/plans");
const response_1 = require("../../utils/response");
const Errors_1 = require("../../Errors");
const getAllPlans = async (req, res) => {
    const plans = await plans_1.PlanModel.find();
    return (0, response_1.SuccessResponse)(res, { message: "Plans fetched successfully", plans });
};
exports.getAllPlans = getAllPlans;
const getPlanById = async (req, res) => {
    const { id } = req.params;
    const plan = await plans_1.PlanModel.findById(id);
    if (!plan) {
        throw new Errors_1.NotFound("Plan not found");
    }
    return (0, response_1.SuccessResponse)(res, { message: "Plan fetched successfully", plan });
};
exports.getPlanById = getPlanById;
