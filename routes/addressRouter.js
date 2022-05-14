import { Router } from "express";
import postAddress from "../controllers/addressController";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware";

const addressRouter = Router();

addressRouter.post("/address", userTokenMiddleware, postAddress);

export default addressRouter;