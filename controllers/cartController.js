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

export async function getCart(req, res) {
  try {
    const { userId } = res.locals.session;
    const user = await db.collection("users").findOne({ _id: userId });
    const carts = user.cart;
    const objRetorno = await Promise.all(
      carts.map(async (cart) => {
        const product = await db
          .collection("products")
          .findOne({ _id: new ObjectId(cart.productId) });
        return { ...product, quant: cart.quant };
      })
    );
    res.status(200).send(objRetorno);
  } catch (e) {
    res.status(500).send("Falha no getCart, aconteceu o seguinte erro: " + e);
  }
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;
  const { userId } = res.locals.session;
  try {
    const user = await db.collection("users").findOne({ _id: userId });
    let cart = user.cart;
    cart = cart.filter((c) => c.productId !== productId);
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { cart: cart } });
    res.status(200).send("Cart atualizado!");
  } catch (e) {
    res
      .status(500)
      .send("Falha no deleteProduct, aconteceu o seguinte erro: " + e);
  }
}
