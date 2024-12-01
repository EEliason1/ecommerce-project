import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <p>Details for product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
