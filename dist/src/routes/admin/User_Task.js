"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Task_1 = require("../../controller/admin/User_Task");
const catchAsync_1 = require("../../utils/catchAsync");
const authenticated_1 = require("../../middlewares/authenticated");
const route = (0, express_1.Router)();
// إضافة يوزر للتاسك → فقط Admin/Administrator
route.post("/", authenticated_1.authenticated, (0, catchAsync_1.catchAsync)(User_Task_1.addUserTask));
// جلب كل اليوزرز في التاسك
route.get("/:taskId", authenticated_1.authenticated, (0, catchAsync_1.catchAsync)(User_Task_1.getalluserattask));
// حذف يوزر من التاسك → فقط Admin/Administrator
route.delete("/:taskId/:user_id", authenticated_1.authenticated, (0, catchAsync_1.catchAsync)(User_Task_1.removeUserFromTask));
// تحديث حالة التاسك → فقط Admin/Administrator، و Task يجب أن تكون done
route.put("/:taskId/:userId", authenticated_1.authenticated, (0, catchAsync_1.catchAsync)(User_Task_1.updateTaskStatus));
exports.default = route;
