import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { MdArrowDropDownCircle } from "react-icons/md";
import ClickAwayListener from "react-click-away-listener";
import Sidebar from "./Sidebar";

const Navbar = ({
  theme,
  toggleTheme,
  query,
  setQuery,
  handleSearch,
  category, // Accept category as a prop
  setCategory, // Accept setCategory as a prop
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleIconClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center p-4 ${
          theme === "light" ? "bg-brand-primary" : "bg-gray-800"
        }`}
      >
        <div>
          <MdArrowDropDownCircle
            onClick={handleIconClick}
            className="text-4xl cursor-pointer"
          />
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold animate-pulse">Chat-Karo</div>
          <div className="text-2xl font-semibold">News</div>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar
            query={query}
            onQueryChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
          />
          <button onClick={toggleTheme} className="text-2xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={[
          { id: "latest", label: "Latest News" },
          { id: "business", label: "Business" },
          { id: "entertainment", label: "Entertainment" },
          { id: "sports", label: "Sports" },
          { id: "technology", label: "Technology" },
          { id: "health", label: "Health" },
          { id: "science", label: "Science" },
          { id: "world", label: "World" },
        ]}
        category={category} // Use the passed category prop
        handleCategoryClick={(catId) => {
          setCategory(catId); // Update the category state in the News component
        }}
      />
    </div>
  );
};

export default Navbar;
