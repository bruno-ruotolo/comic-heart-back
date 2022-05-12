import chalk from "chalk";
import db from "../db.js";

export async function GetProductsList(req, res) {
  const search = req.query.s
  console.log(search)

  try {
    const productsList = await db.collection("products").find({}).toArray();

    if (search) {
      const produtsFiltered = productsList.filter(({ name }) => {
        return (name.toLowerCase()).includes(search.toLowerCase());
      });
      res.status(200).send(produtsFiltered);
      return;
    }

    res.status(200).send(productsList);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}