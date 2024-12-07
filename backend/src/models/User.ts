import mongoose, { Schema, Document, Types } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem {
  productId: Types.ObjectId | IProduct; // Add `IProduct` type to indicate it may be populated
  quantity: number;
}

export interface IUser extends Document {
  username: string;
  password: string;
  cart: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false } // Cart items don't need their own ObjectId
);

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] },
});

export const User = mongoose.model<IUser>("User", UserSchema);
