import { Router } from "express";
import { Product } from "../models/Product";

const productsRouter = Router();

// Get Products with Filtering, Sorting, and Pagination
productsRouter.get("/", async (req, res) => {
  const { search, category, sort, page, limit } = req.query;

  const filter: any = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
  }
  if (category && category !== "All") {
    filter.category = category;
  }

  let sortOption = {};
  if (sort === "price-asc") sortOption = { price: 1 };
  if (sort === "price-desc") sortOption = { price: -1 };
  if (sort === "name-asc") sortOption = { name: 1 };
  if (sort === "name-desc") sortOption = { name: -1 };

  const itemsPerPage = parseInt(limit as string) || 12; // Default to 12 items per page
  const currentPage = parseInt(page as string) || 1;
  const skip = (currentPage - 1) * itemsPerPage;

  try {
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage);
    const total = await Product.countDocuments(filter);

    res.json({ products, total });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Get All Categories
productsRouter.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category", { category: { $ne: null } }); // Exclude null categories
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export { productsRouter };
