import { Router } from "express";
import {getUserRejectionById,getuserRejection } from "../../controller/user/User_Rejection";
import { catchAsync } from "../../utils/catchAsync";
const route = Router();
route.get("/", catchAsync(getuserRejection));
route.get("/:id", catchAsync(getUserRejectionById));
export default route;