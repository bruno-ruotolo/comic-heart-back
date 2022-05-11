import { Router } from "express";

import { signUpSchema } from "../schemas/authSchema.js";
import { signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpSchema, signUp);

export default authRouter;