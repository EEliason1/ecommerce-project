import React from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onProductClick,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div
        onClick={() => onProductClick(product)}
        className="cursor-pointer"
      >
        <h3 className="text-lg font-bold text-green-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 font-semibold text-lg">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
