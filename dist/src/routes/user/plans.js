"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_1 = require("../../controller/user/plans");
const catchAsync_1 = require("../../utils/catchAsync");
const route = (0, express_1.Router)();
route.get("/", (0, catchAsync_1.catchAsync)(plans_1.getAllPlans));
route.get("/:id", (0, catchAsync_1.catchAsync)(plans_1.getPlanById));
exports.default = route;
