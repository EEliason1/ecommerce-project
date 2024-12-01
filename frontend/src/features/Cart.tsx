import React, { useEffect, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const username = localStorage.getItem("username");
      const response = await fetch(`/api/cart?username=${username}`);
      const data = await response.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  return (
    <div className="container mx-auto p-10 text-gray-accent">
      <h1 className="text-2xl font-bold text-green-forest">Your Cart</h1>
      <ul className="mt-6 space-y-4">
        {cart.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between bg-black shadow p-4 rounded border border-gray-accent"
          >
            <span>Product ID: {item.productId}</span>
            <span>Quantity: {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
