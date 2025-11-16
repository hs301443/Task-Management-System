"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../../controller/user/project");
const catchAsync_1 = require("../../utils/catchAsync");
const route = (0, express_1.Router)();
route.get("/", (0, catchAsync_1.catchAsync)(project_1.getUserProjects));
route.get("/:id", (0, catchAsync_1.catchAsync)(project_1.getProjectById));
exports.default = route;
