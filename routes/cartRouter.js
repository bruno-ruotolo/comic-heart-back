import { Router } from "express";
import { addProduct, getCart } from "../controllers/cartController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const cartRouter = Router();

cartRouter.put("/addProduct/:id", userTokenMiddleware, addProduct);
cartRouter.get("/cart", userTokenMiddleware, getCart);

export default cartRouter;
