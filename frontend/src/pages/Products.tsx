import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { fetchWithAuth } from "../helpers/api";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface FetchProductsResponse {
  products: Product[];
  total: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const itemsPerPage = 12;
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchCategories = async () => {
    try {
      const data: string[] = await fetchWithAuth("/api/products/categories");
      setCategories(["All", ...data]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const query = `?search=${debouncedSearchQuery}&category=${
        selectedCategory !== "All" ? selectedCategory : ""
      }&sort=${sortBy}&page=${currentPage}&limit=${itemsPerPage}`;
      const data: FetchProductsResponse = await fetchWithAuth(`/api/products${query}`);
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchQuery, selectedCategory, sortBy, currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    // Add cart logic here
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Explore Our Products
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <SearchBar
          placeholder="Search for products..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <div className="flex gap-2">
          <Dropdown
            options={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
          <Dropdown
            options={[
              { label: "Default", value: "default" },
              { label: "Price: Low to High", value: "price-asc" },
              { label: "Price: High to Low", value: "price-desc" },
              { label: "Name: A-Z", value: "name-asc" },
              { label: "Name: Z-A", value: "name-desc" },
            ]}
            selected={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="loader" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedProduct && (
        <Modal isOpen={!!selectedProduct} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
          <p className="mb-2">{selectedProduct.description}</p>
          <p className="text-lg font-semibold mb-2">
            Price: ${selectedProduct.price}
          </p>
          <p className="text-sm text-gray-500">
            Category: {selectedProduct.category}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Products;
