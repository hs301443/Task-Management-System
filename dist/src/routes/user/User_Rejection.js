"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Rejection_1 = require("../../controller/user/User_Rejection");
const catchAsync_1 = require("../../utils/catchAsync");
const route = (0, express_1.Router)();
route.get("/", (0, catchAsync_1.catchAsync)(User_Rejection_1.getuserRejection));
route.get("/:id", (0, catchAsync_1.catchAsync)(User_Rejection_1.getUserRejectionById));
exports.default = route;
