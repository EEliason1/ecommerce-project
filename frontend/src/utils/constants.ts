export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";
export const DEFAULT_ITEMS_PER_PAGE = 12;
export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];
export const CATEGORIES = ["All", "Electronics", "Books", "Clothing", "Furniture"];
