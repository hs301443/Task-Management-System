import { Router } from "express";
import authRouter from "./auth";
import projectRouter from "./project";
import SubscriptionRouter from "./subscription";
import DepartmentRouter  from "./Department";
import { authenticated } from "../../middlewares/authenticated";
import {  authorizeRoles } from "../../middlewares/authorized";

export const route = Router();

route.use("/auth", authRouter);
route.use(authenticated, authorizeRoles('admin'));
route.use("/project", projectRouter);
route.use("/subscriptions", SubscriptionRouter);
route.use("/departments", DepartmentRouter);


export default route;