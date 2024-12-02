import { Router, Response } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types";

const cartRouter = Router();
const carts: { [username: string]: { productId: number; quantity: number }[] } = {};

cartRouter.use(verifyToken);

cartRouter.get("/", (req: AuthenticatedRequest, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userCart = carts[username] || [];
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cart" });
  }
});

cartRouter.post("/", (req: AuthenticatedRequest, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    if (!carts[username]) {
      carts[username] = [];
    }

    const existingItem = carts[username].find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[username].push({ productId, quantity });
    }

    res.status(201).json(carts[username]);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

cartRouter.delete("/:productId", (req: AuthenticatedRequest, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const productId = parseInt(req.params.productId, 10);

    if (!carts[username]) {
      return res.status(404).json({ message: "Cart not found" });
    }

    carts[username] = carts[username].filter((item) => item.productId !== productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

export { cartRouter };
