import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { productsRouter } from "./routes/products";
import { authRouter } from "./routes/auth";
import { cartRouter } from "./routes/cart";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
