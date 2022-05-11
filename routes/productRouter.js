import { Router } from "express";
import { getProduct } from "../controllers/productController.js";
import { validaHeader } from "../middlewares/validaHeader.js";

const productRouter = Router();

productRouter.get("/product/:id", validaHeader, getProduct);

export default productRouter;
