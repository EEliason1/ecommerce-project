import { Router, Response } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types";
import { prisma } from "../utils/prisma";
import { CartItem } from "../types";

const cartRouter = Router();

// Get Cart Items
cartRouter.get("/", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const username = req.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        CartItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Explicitly type item
    const cartItems = user.CartItem.map((item: CartItem & { Product: { name: string; price: number } }) => ({
      id: item.id,
      productId: item.productId,
      userId: item.userId,
      quantity: item.quantity,
      productName: item.Product.name,
      productPrice: item.Product.price,
    }));

    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add to Cart
cartRouter.post("/", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const username = req.user?.username;
  const { productId, quantity } = req.body;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Product ID and quantity are required." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { userId: user.id, productId },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { userId: user.id, productId, quantity },
      });
    }

    res.status(201).json({ message: "Item added to cart." });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { cartRouter };