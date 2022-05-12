import { Router } from "express";
import { addProduct } from "../controllers/cartController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const cartRouter = Router();

cartRouter.put("/addProduct/:id", userTokenMiddleware, addProduct);

export default cartRouter;
