"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRejectionById = exports.getuserRejection = void 0;
const BadRequest_1 = require("../../Errors/BadRequest");
const response_1 = require("../../utils/response");
const User_Rejection_1 = require("../../models/schema/User_Rejection");
const getuserRejection = async (req, res) => {
    const user = req.user?._id;
    ;
    const userRejection = await User_Rejection_1.UserRejectedReason.find({ userId: user }).populate("reasonId", "reason points").populate("userId", "name email photo");
    (0, response_1.SuccessResponse)(res, { message: "user Rejection", userRejection });
};
exports.getuserRejection = getuserRejection;
const getUserRejectionById = async (req, res) => {
    const user = req.user?._id;
    const id = req.params.id;
    if (!id) {
        throw new BadRequest_1.BadRequest("Please provide user id");
    }
    const userRejection = await User_Rejection_1.UserRejectedReason.findById(id).populate("reasonId", "reason points").populate("userId", "name email photo");
    (0, response_1.SuccessResponse)(res, { message: "user Rejection", userRejection });
};
exports.getUserRejectionById = getUserRejectionById;
