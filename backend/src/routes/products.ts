import { Router } from "express";
import { Product } from "../models/Product";

const productsRouter = Router();

// Get All Products with Case-Insensitive Search
productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    // Transform _id to id for frontend consistency
    const transformedProducts = products.map((product) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
    }));

    res.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export { productsRouter };
