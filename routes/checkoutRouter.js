import { Router } from "express";
import { postCheckout } from "../controllers/checkoutController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", userTokenMiddleware, postCheckout);

export default checkoutRouter;
