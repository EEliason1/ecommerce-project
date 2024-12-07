import React from "react";
import Button from "../components/Button";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
        Welcome to Our E-Commerce Store
      </h1>
      <p className="text-center text-lg mb-8">
        Explore our wide range of products at unbeatable prices!
      </p>
      <div className="flex justify-center">
        <Button
          label="Browse Products"
          onClick={() => {
            window.location.href = "/products";
          }}
        />
      </div>
    </div>
  );
};

export default Home;
