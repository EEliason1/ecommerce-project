import React from "react";
import { useUser } from "../contexts/UserContext";
import { formatPrice } from "../helpers/formatters";

const Cart: React.FC = () => {
  const { cart, updateCartItem, removeFromCart, clearCart } = useUser();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateCartItem(id, quantity);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-gray-600">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-16 border rounded p-2 text-center"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-right">
              Total: {formatPrice(calculateTotal())}
            </h2>
          </div>
          <div className="flex justify-end mt-4 gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
