import { useState } from "react";

interface PaginationHook {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const usePagination = (totalItems: number, itemsPerPage: number): PaginationHook => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return { currentPage, totalPages, setCurrentPage, nextPage, prevPage };
};

export default usePagination;
