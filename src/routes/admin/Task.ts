import { Router } from "express";
import {createTask,getAllTasks,getTaskById,updateTask,deleteTask} from "../../controller/admin/Task"
import { catchAsync } from "../../utils/catchAsync";
import { validate } from "../../middlewares/validation";
import { createTaskSchema, updateTaskSchema } from "../../validation/admin/Task";
import { uploadTaskFiles } from "../../utils/multer"; // ملف multer اللي عملته



const route = Router();

route.get("/", catchAsync(getAllTasks));
route.get("/:id", catchAsync(getTaskById));
route.post(
  "/",
uploadTaskFiles,
  validate(createTaskSchema),        
  catchAsync(createTask)
);
route.put("/:id", validate(updateTaskSchema), catchAsync(updateTask));
route.delete("/:id", catchAsync(deleteTask));
export default route;