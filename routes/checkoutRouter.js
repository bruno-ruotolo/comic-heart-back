import { Router } from "express";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", userTokenMiddleware, getProduct);

export default checkoutRouter;
