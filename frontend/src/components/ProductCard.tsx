import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-gradient-to-br from-green-forest to-green-light text-white border border-gray-light rounded-lg shadow-md hover:scale-105 transition-transform">
      <div className="p-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-sm mt-2">{product.description || "No description available."}</p>
        <p className="mt-4 text-lg font-semibold">
          Price: <span className="text-gray-light">${product.price.toFixed(2)}</span>
        </p>
        <button className="mt-4 bg-black hover:bg-gray-accent text-white px-6 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
