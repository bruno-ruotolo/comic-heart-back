import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import db from "./db.js";

//express config
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//routes

//open server
app.listen(process.env.PORT, () => console.log(chalk.green.bold("Server ON " + process.env.PORT)));