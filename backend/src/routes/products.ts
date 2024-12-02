import { Router } from "express";
import { products } from "../data/products";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  try {
    const search = req.query.search as string | undefined;

    const filteredProducts = search
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : products;

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
});

export { productsRouter };
