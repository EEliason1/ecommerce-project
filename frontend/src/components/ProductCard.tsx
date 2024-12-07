import React, { useState } from "react";
import { fetchWithAuth } from "../utils/api";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const payload = { productId: product.id, quantity };
      console.log("Sending payload:", payload);

      await fetchWithAuth("/api/cart", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("Product added to cart!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Failed to add product to cart.");
      }
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-700 font-bold mt-2">
        ${product.price.toFixed(2)}
      </p>
      <div className="flex justify-between">
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
