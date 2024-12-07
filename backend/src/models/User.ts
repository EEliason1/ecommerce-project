import mongoose, { Schema, Document, Types } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem {
  productId: Types.ObjectId | IProduct; // Either ObjectId or populated IProduct
  quantity: number;
}

export interface IUser extends Document {
  username: string;
  password: string;
  cart: ICartItem[];
  getCartItems(): {
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
  }[];
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] },
});

// Helper method to transform cart items
UserSchema.methods.getCartItems = function () {
  return this.cart.map((item: ICartItem) => {
    const product = item.productId as IProduct;
    return {
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      quantity: item.quantity,
    };
  });
};

export const User = mongoose.model<IUser>("User", UserSchema);
