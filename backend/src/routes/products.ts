import { Router } from "express";
import { Product } from "../models/Product";

const productsRouter = Router();

// Get All Products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a Product (Admin functionality, optional)
productsRouter.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ message: "Name, description, and price are required." });
  }

  try {
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { productsRouter };
