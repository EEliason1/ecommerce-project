import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-forest via-green-light to-gray-accent text-white text-center p-10">
      <h1 className="text-5xl font-bold mb-4">Welcome to Crafts by Jay!</h1>
      <p className="text-xl mb-8">
        Explore amazing products and enjoy the best shopping experience.
      </p>
      <Link to="/products">
        <button className="bg-gradient-to-r from-green-light to-green-forest hover:from-green-forest hover:to-green-light text-white px-6 py-3 rounded shadow-lg">
          Browse Products
        </button>
      </Link>
    </div>
  );
};

export default Home;
