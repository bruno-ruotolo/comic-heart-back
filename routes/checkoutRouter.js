import { Router } from "express";
import {
  getCheckout,
  postCheckout,
} from "../controllers/checkoutController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", userTokenMiddleware, postCheckout);
checkoutRouter.get("/checkout", userTokenMiddleware, getCheckout);

export default checkoutRouter;
