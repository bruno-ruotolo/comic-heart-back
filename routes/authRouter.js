import { Router } from "express";

import { signUpSchema, singInSchema } from "../schemas/authSchema.js";
import { signIn, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpSchema, signUp);
authRouter.post("/", singInSchema, signIn);

export default authRouter;