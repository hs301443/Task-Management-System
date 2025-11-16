import { Router } from "express";
import {getProjectById,getUserProjects} from '../../controller/user/project'
import { catchAsync } from "../../utils/catchAsync";
const route = Router();
route.get("/", catchAsync(getUserProjects));
route.get("/:id", catchAsync(getProjectById));
export default route;