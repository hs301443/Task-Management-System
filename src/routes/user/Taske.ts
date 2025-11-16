import { Router } from "express";
import { getUserTasksByProject, updateUserTaskStatus } from "../../controller/user/taske";
import { authenticated } from "../../middlewares/authenticated";
import { catchAsync } from "../../utils/catchAsync";

const route = Router();

// جلب المهام الخاصة باليوزر لمشروع معين
route.get("/:project_id" , catchAsync(getUserTasksByProject));

// تعديل حالة مهمة خطوة خطوة
route.put("/:taskId", catchAsync(updateUserTaskStatus));

export default route;
