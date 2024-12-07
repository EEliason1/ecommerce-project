import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-Commerce Store
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
