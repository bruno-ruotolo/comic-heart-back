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
// TODO Preciso testar esse addProduct com users/cart já feito, para conseguir ver se a lógica está certa.
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

    const user = res.locals.user;
    const cart = user.cart;
    let findProduct = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === id) {
        cart[i].quant++;
        findProduct = true;
      }
    }
    if (!findProduct) {
      cart.push({ productId: id, quant: 1 });
    }
    await db
      .collection("users")
      .updateOne({ _id: user._id }, { $set: { cart: cart } });
    res.status(200).send("Cart atualizado!");
  } catch (e) {
    res
      .status(500)
      .send("Falha no addProduct, aconteceu o seguinte erro: " + e);
  }
}
