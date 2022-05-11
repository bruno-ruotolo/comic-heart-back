import { Router } from "express";

import { getHeaderCart, logoutHeader } from "../controllers/headerController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const headerRouter = Router();

headerRouter.get("/header", userTokenMiddleware, getHeaderCart);
headerRouter.put("/header", userTokenMiddleware, logoutHeader)

export default headerRouter;