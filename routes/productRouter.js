import { Router } from "express";
import { getProduct } from "../controllers/productController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const productRouter = Router();

productRouter.get("/product/:id", userTokenMiddleware, getProduct);

export default productRouter;
