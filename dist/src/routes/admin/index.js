"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const project_1 = __importDefault(require("./project"));
const subscription_1 = __importDefault(require("./subscription"));
const Task_1 = __importDefault(require("./Task"));
const Department_1 = __importDefault(require("./Department"));
const RejectdReson_1 = __importDefault(require("./RejectdReson"));
// import UserProjectRouter from "./User_Project";
// import usertaskRouter from "./User_Task";
const authenticated_1 = require("../../middlewares/authenticated");
const authorized_1 = require("../../middlewares/authorized");
// import { authorizeRoleAtProject } from "../../middlewares/authorized";
const route = (0, express_1.Router)();
route.use("/auth", auth_1.default);
route.use(authenticated_1.authenticated, (0, authorized_1.authorizeRoles)('admin'));
route.use("/project", project_1.default);
route.use("/subscriptions", subscription_1.default);
route.use("/departments", Department_1.default);
route.use("/rejected-reasons", RejectdReson_1.default);
route.use("/tasks", Task_1.default);
// route.use(
//   "/user-project",
//   // authorizeRoleAtProject(['adminstrator']),
//   UserProjectRouter
// );
// route.use(
//   "/user-task",
//   // authorizeRoleAtProject(['adminstrator']),
//   usertaskRouter
// );
exports.default = route;
