import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import { productsRouter } from "./routes/products";
import { authRouter } from "./routes/auth";
import { cartRouter } from "./routes/cart";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); // CORS policy
app.use(rateLimiter); // Rate limiting
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

// Error handling middleware
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
