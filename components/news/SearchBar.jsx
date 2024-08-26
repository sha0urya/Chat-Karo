import React from "react";

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        onKeyDown={handleKeyDown} // Detect "Enter" key press
        placeholder="Search news..."
        className="p-2 rounded-lg shadow-sm focus:outline-none text-slate-800 focus:ring-2 focus:ring-brand-primary"
      />
      <button
        onClick={onSearch} // Trigger search on button click
        className="absolute right-0 p-2 bg-blue-500  text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

