import { Router } from "express";
import {getUsersByProject,updateuserRole,addUserToProject,deleteUserFromProject,} from "../../controller/admin/User_Project"
import { catchAsync } from "../../utils/catchAsync";
const route = Router();

route.get("/:project_id", catchAsync(getUsersByProject));
route.put("/:user_id/:project_id",catchAsync(updateuserRole));
route.post("/", catchAsync(addUserToProject));
route.delete("/:user_id/:project_id", catchAsync(deleteUserFromProject));



export default route;