import mongoose from "mongoose";
import { Request, Response } from "express";
import { BadRequest } from "../../Errors/BadRequest";
import { NotFound } from "../../Errors/NotFound";
import { UnauthorizedError } from "../../Errors/unauthorizedError";
import { SuccessResponse } from "../../utils/response";
import { UserRejectedReason } from "../../models/schema/User_Rejection";
import { RejectedReson } from "../../models/schema/RejectdReson";
import { User } from "../../models/schema/auth/User";

export const getuserRejection = async (req: Request, res: Response) => {
const user = req.user?._id; ;
const userRejection = await UserRejectedReason.find({ userId: user }).populate("reasonId","reason points").populate("userId","name email photo");
 SuccessResponse(res,{message: "user Rejection", userRejection});
}

export const getUserRejectionById = async (req: Request, res: Response) => {
  const user = req.user?._id;
 const id= req.params.id;
 if (!id) {
   throw new BadRequest("Please provide user id");
 }
  const userRejection = await UserRejectedReason.findById(id).populate("reasonId","reason points").populate("userId","name email photo");
  SuccessResponse(res,{message: "user Rejection", userRejection});
}
