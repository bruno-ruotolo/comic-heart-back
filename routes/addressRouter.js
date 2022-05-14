import { Router } from "express";

import { deleteAddress, getAddress, postAddress } from "../controllers/addressController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";
import { addressSchema } from "../schemas/addressSchema.js";

const addressRouter = Router();

addressRouter.post("/address", userTokenMiddleware, addressSchema, postAddress);
addressRouter.get("/address", userTokenMiddleware, getAddress);
addressRouter.delete("/address", userTokenMiddleware, deleteAddress);

export default addressRouter;