import chalk from "chalk";
import db from "../db.js";

export async function postAddress(req, res) {
  const { cep, city, uf, address, number, complement, reference, district } = req.body;
  const addressBody = {
    cep,
    city,
    uf,
    address,
    number,
    complement,
    district,
    reference
  }
  const { session } = res.locals

  try {
    await db.collection("users").updateOne({ _id: session.userId }, { $set: { address: addressBody } });
    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function getAddress(req, res) {
  const { session } = res.locals

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });

    if (!user.address) return res.status(200).send(null);
    res.status(200).send(user.address);

  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function deleteAddress(req, res) {
  const { session } = res.locals

  try {
    const user = await db.collection("users").updateOne({ _id: session.userId }, { $set: { address: null } });
    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}