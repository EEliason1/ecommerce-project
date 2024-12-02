import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwtUtils";
import { body, validationResult } from "express-validator";

const authRouter = Router();
const users: { username: string; password: string }[] = [];

// Signup
authRouter.post(
  "/signup",
  [
    body("username").isString().isLength({ min: 3 }).withMessage("Invalid username"),
    body("password").isString().isLength({ min: 6 }).withMessage("Invalid password"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  }
);

// Login
authRouter.post(
  "/login",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  }
);

export { authRouter };
