import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

let db = null;

try {
  const mongoClient = new MongoClient(process.env.MONGO_URL);
  await mongoClient.connect();
  db = mongoClient.db(process.env.BANCO);

  console.log(chalk.green.bold("Data Base ON"));
} catch (e) {
  console.log(chalk.red.bold("Data Base OFF", e));
}

export default db;
