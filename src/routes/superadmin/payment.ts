import { Router } from "express";
import {updatePayment,getAllPaymentsAdmin,getPaymentByIdAdmin} from "../../controller/superadmin/payment"
import { catchAsync } from "../../utils/catchAsync";
const route = Router();
route.put("/:id", catchAsync(updatePayment));
route.get("/", catchAsync(getAllPaymentsAdmin));
route.get("/:id", catchAsync(getPaymentByIdAdmin));
export default route;
