"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../user/auth/index"));
const payment_method_1 = __importDefault(require("../superadmin/payment_method"));
const payment_1 = __importDefault(require("./payment"));
const authenticated_1 = require("../../middlewares/authenticated");
const authorized_1 = require("../../middlewares/authorized");
const route = (0, express_1.Router)();
route.use("/auth", index_1.default);
route.use(authenticated_1.authenticated, (0, authorized_1.authorizeRoles)('User'));
route.use("/payment-methods", payment_method_1.default);
route.use("/payments", payment_1.default);
exports.default = route;
