import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { AuthenticatedRequest } from "../types";

const cartRouter = Router();

// GET Cart Items
cartRouter.get("/", verifyToken, async (req: AuthenticatedRequest, res) => {
  const username = req.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized: No user found." });
  }

  try {
    const user = await User.findOne({ username }).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.getCartItems());
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST Add to Cart
cartRouter.post("/", verifyToken, async (req: AuthenticatedRequest, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Product ID and quantity are required." });
  }

  try {
    const user = await User.findOne({ username: req.user?.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(201).json({ message: "Item added to cart." });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// PUT Update Cart Item
cartRouter.put("/", verifyToken, async (req: AuthenticatedRequest, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Product ID and quantity are required." });
  }

  try {
    const user = await User.findOne({ username: req.user?.username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json({ message: "Cart item updated successfully." });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// DELETE Remove Cart Item
cartRouter.delete("/", verifyToken, async (req: AuthenticatedRequest, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    const user = await User.findOne({ username: req.user?.username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.cart = user.cart.filter((item) => !item.productId.equals(productId));
    await user.save();

    res.status(200).json({ message: "Item removed from cart." });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export { cartRouter };
