import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null); // Store all products
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null); // Store filtered products
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch products.");
          return;
        }

        const data = await response.json();
        setAllProducts(data);
        setFilteredProducts(data); // Initially display all products
      } catch (err) {
        setError("An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(allProducts); // Show all products if search is empty
    } else {
      const filtered = allProducts?.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered || []);
    }
  }, [searchQuery, allProducts]); // Update filter when search or product list changes

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (filteredProducts === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Available Products</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="w-full border rounded p-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
