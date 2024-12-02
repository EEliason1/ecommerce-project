import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
  };
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  