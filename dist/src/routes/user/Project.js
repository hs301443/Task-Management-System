"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../../controller/user/project");
const catchAsync_1 = require("../../utils/catchAsync");
const authorized_1 = require("../../middlewares/authorized");
const route = (0, express_1.Router)();
// ❌ غلط تعمل authorization هنا
route.get("/", (0, catchAsync_1.catchAsync)(project_1.getallProject));
// ✔️ صح — هنا فقط تحتاج role check لأن فيه project_id
route.get("/:project_id", (0, authorized_1.authorizeRoles)("admin", "user"), (0, authorized_1.checkProjectOrTaskRole)(["teamlead", "Member", "Membercanapprove"]), (0, catchAsync_1.catchAsync)(project_1.getProjectDetailsForUser));
exports.default = route;
