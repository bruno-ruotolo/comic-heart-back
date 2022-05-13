import joi from "joi";
import db from "./../db.js";

export async function getCheckout(req, res) {
  const { userId } = res.locals.session;
  try {
    const user = await db.collection("users").findOne({ _id: userId });

    res.status(200).send({ name: user.name, email: user.email });
  } catch (e) {
    res.status(500).send("Falha no Checkout, aconteceu o seguinte erro: " + e);
  }
}

export async function postCheckout(req, res) {
  const checkoutSchema = joi.object({
    cpf: joi.string().required(),
    payment: joi.alternatives().try(joi.string(), joi.object()).required(),
    totalValue: joi.number().required(),
  });
  const { error } = checkoutSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(422).send(error.details.map((detail) => detail.message));
  }
  const { cpf, payment, totalValue } = req.body;
  const { userId } = res.locals.session;
  try {
    const user = await db.collection("users").findOne({ _id: userId });
    await db.collection("checkout").insertOne({
      userId,
      username: user.name,
      cpf,
      payment,
      cart: user.cart,
      totalValue,
    });
    res.status(201).send("Seu checkout foi feito!");
  } catch (e) {
    res.status(500).send("Falha no Checkout, aconteceu o seguinte erro: " + e);
  }
}
