import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { AuthenticatedRequest } from "../types";
import mongoose from "mongoose";

const cartRouter = Router();

// Get Cart Items
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

    const cartItems = user.cart.map((item) => {
      if (item.productId instanceof mongoose.Types.ObjectId) {
        throw new Error("Product not fully populated");
      }

      return {
        productId: item.productId._id,
        productName: item.productId.name,
        productPrice: item.productId.price,
        quantity: item.quantity,
      };
    });

    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add to Cart
cartRouter.post("/", verifyToken, async (req: AuthenticatedRequest, res) => {
  const username = req.user?.username;
  const { productId, quantity } = req.body;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized: No user found." });
  }

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Product ID and quantity are required." });
  }

  try {
    const user = await User.findOne({ username });
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
    res.status(500).json({ message: "Internal server error" });
  }
});

export { cartRouter };
