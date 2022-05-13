import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";
import headerRouter from "./routes/headerRouter.js";
import productListRouter from "./routes/productListRouter.js";
import cartRouter from "./routes/cartRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";

//express config
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//routes
app.use(authRouter);
app.use(headerRouter);
app.use(productListRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(checkoutRouter);

//open server
app.listen(process.env.PORT, () =>
  console.log(chalk.blue.bold("Server ON port " + process.env.PORT))
);
