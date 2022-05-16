import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function userTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const secretKey = process.env.JWT_SECRET;

  if (!token) return res.status(401).send("Token Inexistente");

  try {
    const data = jwt.verify(token, secretKey);
    if (!data) return res.status(401).send("Token Inexistente ou Inspirado");

    const session = await db.collection("sessions").findOne({ token, status: true });
    if (!session) return res.status(401).send("Token Inexistente ou Inspirado");

    res.locals.session = session;
    next();
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
}
