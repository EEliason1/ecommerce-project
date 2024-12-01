import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-forest to-green-light text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
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
      </div>
    </header>
  );
};

export default Header;
