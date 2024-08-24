import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ limit, total, activePage, setActivePage }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextPage = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  if (totalPages <= 1) {
    // Hide pagination if only one page or no results
    return null;
  }

  return (
    <div className="flex items-center justify-end space-x-4 my-3 mx-6">
      <button
        onClick={handlePrevPage}
        disabled={activePage === 1}
        className={`p-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md ${
          activePage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-300 ease-in-out"
        }`}
      >
        <FaChevronLeft />
      </button>

      <span className="text-sm text-slate-900 dark:text-gray-500 font-normal m-1">
        Page {activePage} of {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={activePage === totalPages}
        className={`p-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md ${
          activePage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-300 ease-in-out"
        }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
