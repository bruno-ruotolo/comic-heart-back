import { Router } from "express";
import { addProduct, getProduct } from "../controllers/productController.js";
import { validaHeader } from "../middlewares/validaHeader.js";

const productRouter = Router();

productRouter.get("/product/:id", validaHeader, getProduct);
productRouter.put("/addProduct/:id", validaHeader, addProduct);

export default productRouter;
