import React, { useEffect, useState } from "react";
import Header from "@/layout/Header";
import {
  calculatePagination,
  handleNext,
  handlePrevious,
  validateFetchedCategories,
  getCurrentItems,
} from "../utils/pagination";
import { fetchCategories } from "../services/fetchCategories";
import { filterCategories, sortItems } from '@/utils/categoryUtils';

const ShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // Set to empty string by default

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      if (validateFetchedCategories(fetchedCategories)) {
        setCategories(fetchedCategories);
      } else {
        console.error(
          "Fetched categories is not a valid array of objects:",
          fetchedCategories
        );
      }
    };
    getCategories();
  }, []);

  // Filter categories based on selected gender
  const filteredCategories = filterCategories(categories, selectedGender);

  // Pagination calculations
  const { totalPages } = calculatePagination(
    currentPage,
    itemsPerPage,
    filteredCategories.length
  );
  const currentItems = getCurrentItems(filteredCategories, currentPage, itemsPerPage);

  // Sorting logic
  const sortedItems = sortItems(currentItems, sortOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <Header />
      <div className="flex flex-col items-center gap-20">
        <h5>Home {" > "} Shop</h5>
        <div className="flex justify-center gap-5">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="border rounded max-w-[60%] p-2"
          >
            <option value="">Filter by gender</option>
            <option value="k">Woman</option>
            <option value="e">Man</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded  max-w-[40%] p-2"
          >
            <option value="">Sort by rating</option>
            <option value="asc">Sort by Rating: Ascending</option>
            <option value="desc">Sort by Rating: Descending</option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-32">
          <h3>Categories</h3>
          {sortedItems.map((category, index) => (
            <div key={index} className="relative">
              <img
              className="w-screen h-auto"
                src={category.img}
                alt={category.title}
                
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-1">
                {category.gender === "k" ? "Kadın" : "Erkek"} {category.title} (
                {category.rating}⭐)
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white shadow-md rounded-lg flex justify-center items-center gap-5 p-4">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() =>
              handlePageChange(handlePrevious(currentPage, totalPages))
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() =>
              handlePageChange(handleNext(currentPage, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </ div>
    </section>
  );
};

export default ShopPage;