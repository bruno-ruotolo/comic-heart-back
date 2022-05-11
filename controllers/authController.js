import bcrypt from "bcrypt";
import chalk from "chalk";

import db from "./../db.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const userCollection = await db.collection("users")
    const isUser = await userCollection.findOne({ email: email.toLowerCase() });
    if (isUser) return res.status(409).send("Esse usuário já existe");

    await userCollection.insertOne({
      name,
      email: email.toLowerCase(),
      passwordHash,
      cart: []
    })

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}