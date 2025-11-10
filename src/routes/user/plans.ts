import { Router } from "express";
import {getAllPlans,getPlanById} from "../../controller/user/plans"
import { catchAsync } from "../../utils/catchAsync";
const route = Router();
route.get("/", catchAsync(getAllPlans));
route.get("/:id", catchAsync(getPlanById));
export default route;
