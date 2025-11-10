 import { Router } from "express";
import authRouter from "../user/auth/index";
import paymentMethodRouter from "../superadmin/payment_method";
import paymentRouter  from "./payment";
import { authenticated } from "../../middlewares/authenticated";
import { authorizeRoles } from "../../middlewares/authorized";
 const route = Router();
route.use("/auth", authRouter);
route.use(authenticated, authorizeRoles('User'));
route.use("/payment-methods", paymentMethodRouter);
route.use("/payments", paymentRouter);

 export default route;