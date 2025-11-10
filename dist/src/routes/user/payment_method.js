"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_method_1 = require("../../controller/user/payment_method");
const catchAsync_1 = require("../../utils/catchAsync");
const route = (0, express_1.Router)();
route.get("/", (0, catchAsync_1.catchAsync)(payment_method_1.getPaymentmethod));
route.get("/:id", (0, catchAsync_1.catchAsync)(payment_method_1.getPaymentmethodById));
exports.default = route;
