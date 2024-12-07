import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Header: React.FC = () => {
  const { username, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-green-forest to-green-light text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">E-Commerce</Link>
        </h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/products" className="hover:text-black">
            Products
          </Link>
          <Link to="/cart" className="hover:text-black">
            Cart
          </Link>
        </nav>
        <div>
          {username ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-light">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-black hover:bg-gray-accent text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-black hover:bg-gray-accent text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
