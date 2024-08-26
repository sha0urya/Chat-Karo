import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => (
  <button
    className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-lg font-semibold transition-all duration-300 hover:bg-gray-300 focus:outline-none"
    onClick={toggleTheme}
  >
    {isDarkMode ? (
      <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
    ) : (
      <FontAwesomeIcon icon={faMoon} className="text-blue-500" />
    )}
  </button>
);

export default ThemeToggle;
