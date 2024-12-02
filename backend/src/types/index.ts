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

  export interface CartItem {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    productName?: string;
    productPrice?: number;
  }
   
  