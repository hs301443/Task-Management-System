import { Router } from "express";
import {createProject,getAllProjects,getProjectById,updateProjectById,deleteProjectById} from "../../controller/admin/project"
import { createProjectSchema,updateProjectSchema } from "../../validation/admin/project";
import { validate } from "../../middlewares/validation";
import { catchAsync } from "../../utils/catchAsync";

const route = Router();
route.post("/",validate(createProjectSchema) ,catchAsync(createProject));
route.get("/", catchAsync(getAllProjects));
route.get("/:id", catchAsync(getProjectById));
route.put("/:id", validate(updateProjectSchema) ,catchAsync(updateProjectById));
route.delete("/:id", catchAsync(deleteProjectById));
export default route;