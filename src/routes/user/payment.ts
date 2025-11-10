import { Router } from "express";
import { createPayment,getAllPayments,getPaymentById } from "../../controller/user/payment";
import { catchAsync } from "../../utils/catchAsync";

const route = Router();
route.post("/", catchAsync(createPayment));
route.get("/", catchAsync(getAllPayments));
route.get("/:id", catchAsync(getPaymentById));
export default route;