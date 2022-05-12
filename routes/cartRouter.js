import { Router } from "express";
import {
  addProduct,
  getCart,
  deleteProduct,
  changeQuant,
} from "../controllers/cartController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const cartRouter = Router();

cartRouter.put("/addProduct/:id", userTokenMiddleware, addProduct);
cartRouter.get("/cart", userTokenMiddleware, getCart);
cartRouter.delete("/cart/:productId", userTokenMiddleware, deleteProduct);
cartRouter.post("/changeQuant", userTokenMiddleware, changeQuant);

export default cartRouter;
