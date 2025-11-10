import { Router } from "express";
import authRouter from "./auth";
import projectRouter from "./project";
import { authenticated } from "../../middlewares/authenticated";
import {  authorizeRoles } from "../../middlewares/authorized";

export const route = Router();

route.use("/auth", authRouter);
route.use(authenticated, authorizeRoles('Admin', 'SuperAdmin'));
route.use("/project", projectRouter);



export default route;