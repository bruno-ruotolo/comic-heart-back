import db from "../db.js";

export async function getHeaderCart(req, res) {
  const { userId } = res.locals.session;

  try {
    const { cart } = await db.collection("users").findOne({ _id: userId })
    res.status(200).send(cart);
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function logoutHeader(req, res) {
  const session = res.locals.session;

  try {
    await db.collection("sessions").updateOne({ token: session.token }, { $set: { status: false } })
    res.sendStatus(201);
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
}