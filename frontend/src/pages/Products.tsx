import React, { useEffect, useState, useCallback } from "react";
import useDebounce from "../utils/useDebounce"; // Ensure this hook exists
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
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

  // Debounced values
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedCategory = useDebounce(selectedCategory, 300);
  const debouncedSortBy = useDebounce(sortBy, 300);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/products/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(["All", ...data]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const query = `?search=${debouncedSearchQuery}&category=${
        debouncedCategory !== "All" ? debouncedCategory : ""
      }&sort=${debouncedSortBy}&page=${currentPage}&limit=${itemsPerPage}`;
      const response = await fetch(`/api/products${query}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
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
  }, [debouncedSearchQuery, debouncedCategory, debouncedSortBy, currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleProductClick = useCallback(
    (e: React.MouseEvent, product: Product) => {
      // Prevent modal opening when interacting with buttons
      if (
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("button")
      ) {
        return;
      }
      setSelectedProduct(product);
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).id === "modal-overlay") {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (selectedProduct) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct, handleKeyDown]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Explore Our Products
      </h1>

      {/* Filter and Sorting Options */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 flex-shrink-0 lg:w-1/3"
        />

        {/* Sorting and Filters */}
        <div className="flex gap-2 lg:gap-4 items-center">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`border rounded p-2 ${
              selectedCategory !== "All" ? "bg-green-100" : ""
            }`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-2"
            title="Sort products by price or name"
          >
            <option value="default">Sort by</option>
            <option value="price-asc" title="Price: Low to High">
              Price: Low to High
            </option>
            <option value="price-desc" title="Price: High to Low">
              Price: High to Low
            </option>
            <option value="name-asc" title="Name: A-Z">
              Name: A-Z
            </option>
            <option value="name-desc" title="Name: Z-A">
              Name: Z-A
            </option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={(e) => handleProductClick(e, product)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-green-700 text-white"
                : "bg-gray-200 hover:bg-green-500 text-gray-700 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOutsideClick}
          role="dialog"
          aria-labelledby="product-modal-title"
          aria-describedby="product-modal-description"
        >
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 id="product-modal-title" className="text-2xl font-bold mb-4">
              {selectedProduct.name}
            </h2>
            <p id="product-modal-description" className="mb-2">
              {selectedProduct.description}
            </p>
            <p className="text-lg font-semibold">
              Price: ${selectedProduct.price}
            </p>
            <p className="text-sm text-gray-500">
              Category: {selectedProduct.category}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
