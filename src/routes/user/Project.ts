import { Router } from "express";
import {getallProject,getProjectDetailsForUser,addUserToProject,deleteUserFromProject,updateUserRole,getUsersByProject} from '../../controller/user/project'
import { catchAsync } from "../../utils/catchAsync";
// import { authorizeRoleAtProject } from "../../middlewares/authorized";
const route = Router();
route.get("/:project_id", catchAsync(getProjectDetailsForUser));
route.get("/", catchAsync(getallProject));
route.post("/" ,catchAsync(addUserToProject));
route.put("/:userId/:project_id",catchAsync(updateUserRole));
route.delete("/:userId/:project_id", catchAsync(deleteUserFromProject));
route.get("/users/:project_id", catchAsync(getUsersByProject));
export default route;