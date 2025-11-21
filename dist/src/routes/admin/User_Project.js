"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Project_1 = require("../../controller/admin/User_Project");
const catchAsync_1 = require("../../utils/catchAsync");
const validation_1 = require("../../middlewares/validation");
const User_Project_2 = require("../../validation/admin/User_Project");
const authorized_1 = require("../../middlewares/authorized");
const route = (0, express_1.Router)();
// استدعاء middleware لكل route على حدة
route.get("/:project_id", (0, authorized_1.authorizeRoles)("admin", "user"), (0, authorized_1.checkProjectOrTaskRole)(["teamlead"]), (0, catchAsync_1.catchAsync)(User_Project_1.getAllUsersInProject));
route.put("/:user_id/:project_id", (0, authorized_1.authorizeRoles)("admin", "user"), (0, authorized_1.checkProjectOrTaskRole)(["teamlead"]), (0, validation_1.validate)(User_Project_2.updateUserProjectSchema), (0, catchAsync_1.catchAsync)(User_Project_1.updateUserRole));
route.post("/", (0, authorized_1.authorizeRoles)("admin", "user"), (0, authorized_1.checkProjectOrTaskRole)(["teamlead"]), (0, validation_1.validate)(User_Project_2.createUserProjectSchema), (0, catchAsync_1.catchAsync)(User_Project_1.addUserToProject));
route.delete("/:user_id/:project_id", (0, authorized_1.authorizeRoles)("admin", "user"), (0, authorized_1.checkProjectOrTaskRole)(["teamlead"]), (0, catchAsync_1.catchAsync)(User_Project_1.deleteUserFromProject));
exports.default = route;
