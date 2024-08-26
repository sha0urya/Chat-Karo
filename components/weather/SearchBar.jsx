import React from "react";

const SearchBar = ({ input, setInput, search, isDarkMode }) => (
  <div className="w-full max-w-md mb-6">
    <input
      type="text"
      className={`w-full border-2 ${
        isDarkMode ? "border-gray-500" : "border-gray-300"
      } rounded-lg text-lg ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-[#e5eef0] text-gray-800"
      } px-6 py-3 outline-none transition-all duration-300 focus:border-blue-500 shadow-lg hover:shadow-2xl`}
      placeholder="🌍 Enter City Name..."
      value={input}
      onChange={(event) => setInput(event.target.value)}
      onKeyPress={search}
    />
  </div>
);

export default SearchBar;
