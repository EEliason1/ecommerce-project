import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UserContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <UserContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
