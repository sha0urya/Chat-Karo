import React from "react";

const CategoryButton = ({ cat, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(cat.id)}
      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ease-in-out ${
        isSelected
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {cat.label}
    </button>
  );
};

export default CategoryButton;
