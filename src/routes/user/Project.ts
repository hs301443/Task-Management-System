import { Router } from "express";
import { getallProject, getProjectDetailsForUser } from "../../controller/user/project";
import { catchAsync } from "../../utils/catchAsync";
import { authorizeRoles, checkProjectOrTaskRole } from "../../middlewares/authorized";

const route = Router();

// ❌ غلط تعمل authorization هنا
route.get("/", catchAsync(getallProject));

// ✔️ صح — هنا فقط تحتاج role check لأن فيه project_id
route.get(
  "/:project_id",
  authorizeRoles("admin", "user"),
  checkProjectOrTaskRole(["teamlead", "Member", "Membercanapprove"]),
  catchAsync(getProjectDetailsForUser)
);

export default route;
