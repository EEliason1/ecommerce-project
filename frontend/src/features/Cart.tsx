import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import LoadingSpinner from "../components/Spinner";
import { fetchWithAuth } from "../helpers/api";

interface CartItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { token, username } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(1);

  const fetchCart = async () => {
    if (!token || !username) {
      setError("User is not logged in.");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch cart items.");
        return;
      }

      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError("An error occurred while fetching the cart.");
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await fetchWithAuth("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      console.log("Item removed from cart.");
      fetchCart(); // Refresh cart items
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Failed to delete item from cart.");
      }
    }
  };

  const handleEdit = async (productId: string) => {
    try {
      await fetchWithAuth("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      console.log("Cart item updated.");
      fetchCart(); // Refresh cart items
      setEditingProductId(null);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Failed to update cart item.");
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token, username]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (cartItems === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between items-center bg-gray-100 shadow p-4 rounded"
          >
            <span className="flex-1 text-left">{item.productName}</span>
            {editingProductId === item.productId ? (
              <div className="flex items-center space-x-2 flex-1 justify-center">
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  min="1"
                  className="w-16 text-center border rounded"
                />
                <button
                  onClick={() => handleEdit(item.productId)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                >
                  ✔
                </button>
                <button
                  onClick={() => setEditingProductId(null)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  ✖
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-center">
                  Quantity: {item.quantity}
                </span>
                <span className="flex-1 text-right">
                  ${(item.productPrice * item.quantity).toFixed(2)}
                </span>
                <div className="flex space-x-4 ml-8">
                  <button
                    onClick={() => setEditingProductId(item.productId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  >
                    🗑
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
