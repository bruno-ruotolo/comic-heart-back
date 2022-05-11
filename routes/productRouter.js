import { Router } from "express";
import { addProduct, getProduct } from "../controllers/productController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const productRouter = Router();

productRouter.get("/product/:id", userTokenMiddleware, getProduct);
productRouter.put("/addProduct/:id", userTokenMiddleware, addProduct);

export default productRouter;
