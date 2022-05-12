import db from "./../db.js";
import { ObjectId } from "mongodb";

export async function addProduct(req, res) {
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
    const { userId } = res.locals.session;
    const user = await db.collection("users").find({ _id: userId }).toArray();
    console.log(user[0].cart);
    let cart = user[0].cart;
    if (cart.length !== 0) {
      let findProduct = false;
      for (let i = 0; i < cart?.length; i++) {
        if (cart[i].productId === id) {
          cart[i].quant++;
          findProduct = true;
        }
      }
      if (!findProduct) {
        cart.push({ productId: id, quant: 1 });
      }
    } else {
      cart = [{ productId: id, quant: 1 }];
    }
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { cart: cart } });
    res.status(200).send("Cart atualizado!");
  } catch (e) {
    res
      .status(500)
      .send("Falha no addProduct, aconteceu o seguinte erro: " + e);
  }
}
