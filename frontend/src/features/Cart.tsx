import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

interface CartItem {
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
}

const Cart: React.FC = () => {
  const { username, token } = useUser();
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!username || !token) {
        setError("User is not logged in.");
        return;
      }

      try {
        const response = await fetch(`/api/cart?username=${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch cart.");
          return;
        }

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchCart();
  }, [username, token]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (cart === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ul className="mt-6 space-y-4">
        {cart.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between bg-gray-100 shadow p-4 rounded"
          >
            <span>{item.productName}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Price: ${(item.productPrice * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
