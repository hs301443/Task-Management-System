import { Router } from "express";
import {createDepartment,getAllDepartments,getDepartmentById,updateDepartment,deleteDepartment} from "../../controller/admin/Department"
import { catchAsync } from "../../utils/catchAsync";
import { validate } from "../../middlewares/validation";
import { createDepartmentSchema, updateDepartmentSchema } from "../../validation/admin/Department";
const route = Router();
route.get("/", catchAsync(getAllDepartments));
route.get("/:id", catchAsync(getDepartmentById));
route.post("/", validate(createDepartmentSchema), catchAsync(createDepartment));
route.put("/:id", validate(updateDepartmentSchema), catchAsync(updateDepartment));
route.delete("/:id", catchAsync(deleteDepartment));
export default route;