import React from "react";
import { useUser } from "../contexts/UserContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { token, username } = useUser();

  const handleAddToCart = async () => {
    if (!token || !username) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to add to cart: ${errorData.message}`);
        return;
      }

      alert(`${product.name} has been added to your cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 border rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="mt-2">{product.description}</p>
      <p className="mt-4 text-lg font-semibold">Price: ${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
