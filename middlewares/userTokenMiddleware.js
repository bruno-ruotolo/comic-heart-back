import db from "../db.js";

export async function userTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) return res.status(401).send("Token Inexistente");

  try {
    const session = await db.collection("sessions").findOne({ token, status: true });
    if (!session) return res.status(401).send("Token Inexistente ou Inspirado");

    res.locals.session = session;
    next();
  } catch (e) {
    res.sendStatus(500);
  }
}
