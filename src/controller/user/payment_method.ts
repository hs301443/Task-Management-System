
import mongoose from "mongoose";
import { Request, Response } from "express";
import { PaymentMethodModel } from "../../models/schema/payment_methods";
import { BadRequest } from "../../Errors/BadRequest";
import { NotFound } from "../../Errors/NotFound";
import { UnauthorizedError } from "../../Errors/unauthorizedError";
import { SuccessResponse } from "../../utils/response";

export const getPaymentmethod=async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError("User is not authenticated");
    const paymentmethods = await PaymentMethodModel.find({ isActive: true });
    SuccessResponse(res, { message: "Payment methods fetched successfully", paymentmethods });
};

export const getPaymentmethodById=async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError("User is not authenticated");
    const { id } = req.params;  
    if (!id) throw new BadRequest("Please provide payment method id");
    const paymentmethod = await PaymentMethodModel.findById(id);
    if (!paymentmethod) throw new NotFound("Payment method not found");
    SuccessResponse(res, { message: "Payment method fetched successfully", paymentmethod });
}


