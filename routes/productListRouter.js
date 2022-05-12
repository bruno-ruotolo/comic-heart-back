import { Router } from "express";
import { GetProductsList } from "../controllers/productsListController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const productListRouter = Router();

productListRouter.get("/main", userTokenMiddleware, GetProductsList);

export default productListRouter;
