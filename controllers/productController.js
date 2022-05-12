import db from "./../db.js";
import { ObjectId } from "mongodb";

export async function getProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await db
      .collection("products")
      .find({ _id: new ObjectId(id) })
      .toArray();
    if (product.length === 0)
      return res
        .status(404)
        .send("O id enviado não foi encontrado no Banco de Dados");
    res.status(200).send(product);
  } catch (e) {
    res
      .status(500)
      .send("Falha no getProduct, aconteceu o seguinte erro: " + e);
  }
}
