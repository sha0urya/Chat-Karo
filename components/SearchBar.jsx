// import React from "react";

// const SearchBar = ({ query, onQueryChange, onSearch }) => {
//   return (
//     <div className="flex justify-center">
//       <input
//         type="text"
//         placeholder="Search news..."
//         value={query}
//         onChange={onQueryChange}
//         className="border border-gray-300 text-gray-800 rounded px-4 py-2 w-full max-w-md"
//       />
//       <button
//         onClick={onSearch}
//         className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition-colors duration-300 ease-in-out"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;

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
        className="p-1 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />
      <button
        onClick={onSearch} // Trigger search on button click
        className="absolute right-0 p-1 bg-blue-500  text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

