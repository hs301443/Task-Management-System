import { Router } from "express";
import {getPaymentmethod,getPaymentmethodById} from "../../controller/user/payment_method"
import { catchAsync } from "../../utils/catchAsync";
const route = Router();
route.get("/", catchAsync(getPaymentmethod));
route.get("/:id", catchAsync(getPaymentmethodById));
export default route;