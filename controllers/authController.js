import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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
      password: passwordHash,
      cart: []
    })

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email: email.toLowerCase() });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({
        userId: user._id,
        date: new Date(),
        status: true,
        token
      })

      res.status(200).send({ token, name: user.name });
      return;
    } else return res.status(400).send("Usuario/senha invalido");

  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
}