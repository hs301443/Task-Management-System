"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentmethodById = exports.getPaymentmethod = void 0;
const payment_methods_1 = require("../../models/schema/payment_methods");
const BadRequest_1 = require("../../Errors/BadRequest");
const NotFound_1 = require("../../Errors/NotFound");
const unauthorizedError_1 = require("../../Errors/unauthorizedError");
const response_1 = require("../../utils/response");
const getPaymentmethod = async (req, res) => {
    if (!req.user)
        throw new unauthorizedError_1.UnauthorizedError("User is not authenticated");
    const paymentmethods = await payment_methods_1.PaymentMethodModel.find({ isActive: true });
    (0, response_1.SuccessResponse)(res, { message: "Payment methods fetched successfully", paymentmethods });
};
exports.getPaymentmethod = getPaymentmethod;
const getPaymentmethodById = async (req, res) => {
    if (!req.user)
        throw new unauthorizedError_1.UnauthorizedError("User is not authenticated");
    const { id } = req.params;
    if (!id)
        throw new BadRequest_1.BadRequest("Please provide payment method id");
    const paymentmethod = await payment_methods_1.PaymentMethodModel.findById(id);
    if (!paymentmethod)
        throw new NotFound_1.NotFound("Payment method not found");
    (0, response_1.SuccessResponse)(res, { message: "Payment method fetched successfully", paymentmethod });
};
exports.getPaymentmethodById = getPaymentmethodById;
