import { Router } from "express";
import {
  addUserTask,
  getalluserattask,
  removeUserFromTask,
  updateTaskStatus
} from "../../controller/admin/User_Task";
import { catchAsync } from "../../utils/catchAsync";
import { authenticated } from "../../middlewares/authenticated";
import { authorizeRoleAtProject } from "../../middlewares/authorized";

const route = Router();

// إضافة يوزر للتاسك → فقط Admin/Administrator
route.post(
  "/",
  authenticated,
  catchAsync(addUserTask)
);

// جلب كل اليوزرز في التاسك
route.get(
  "/:taskId",
  authenticated,
  catchAsync(getalluserattask)
);

// حذف يوزر من التاسك → فقط Admin/Administrator
route.delete(
  "/:taskId/:user_id",
  authenticated,
  catchAsync(removeUserFromTask)
);

// تحديث حالة التاسك → فقط Admin/Administrator، و Task يجب أن تكون done
route.put(
  "/:taskId/:userId",
  authenticated,
  catchAsync(updateTaskStatus)
);

export default route;
