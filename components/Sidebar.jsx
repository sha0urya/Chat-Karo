import React from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import {
  MdOutlineBusinessCenter,
  MdOutlineSportsCricket,
} from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import { BiCategory, BiSolidMoviePlay } from "react-icons/bi";
import { GiTeamIdea } from "react-icons/gi";
import { Tooltip } from "react-tooltip";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";

const Sidebar = ({
  isOpen,
  onClose,
  categories,
  category,
  handleCategoryClick,
}) => {
  const router = useRouter();
  if (!isOpen) {
    return null;
  }

  const handleClickAway = () => {
    console.log("Clicked outside");
    onClose();
  };

 const handleGoBack = () => {
  //  const router = useRouter();
   router.push("/");
 };

  const categoryIcons = {
    Business: <FcBusinessman className="text-2xl" />,
    Uncategorized: <MdOutlineBusinessCenter className="text-2xl" />,
    Sports: <MdOutlineSportsCricket className="text-2xl" />,
    Entertainment: <BiSolidMoviePlay className="text-2xl" />,
    Technology: <GiTeamIdea className="text-2xl" />,
    Health: <GiTeamIdea className="text-2xl" />,
    Science: <GiTeamIdea className="text-2xl" />,
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex z-50 glass-effect">
        <div className="relative p-2 bg-gradient-to-b from-gray-600 to-blue-600 w-80 shadow-lg flex flex-col h-full overflow-y-hidden">
          {/* <button
            onClick={() => {
              console.log("Close button clicked");
              onClose();
            }}
            className="absolute top-0 right-4 text-white"
          >
            <FaTimes size={24} />
          </button> */}

          <div className="flex-grow overflow-auto">
            <div className="space-y-6 border-white">
              <div>
                <button
                  onClick={() => {
                    console.log("Close button clicked");
                    onClose();
                  }}
                  className="absolute top-0 right-4 text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="flex items-center border-b-2 border-dotted px-2 mb-3">
                <div className="bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-2xl font-bold">
                    <BiCategory height={60} width={60} />
                  </span>
                </div>
                <span className="text-2xl font-bold text-white ml-3">
                  Categories
                </span>
              </div>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    console.log(`Category clicked in Sidebar: ${cat.id}`);
                    handleCategoryClick(cat.id);
                  }}
                  className={`flex items-center text-lg font-semibold p-2 border-solid border-b-4 border-l-2 border-purple-300 rounded-lg transition-all duration-300 w-full ${
                    category === cat.id
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-blue-500 hover:shadow-lg"
                  }`}
                  aria-label={`Select ${cat.label} category`}
                >
                  <span className="mr-4">{categoryIcons[cat.label]}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGoBack}
            className="flex items-center justify-between border-solid border-b-4 border-t-2 border-r-2 border-red-400 rounded-lg text-lg text-white py-3 px-5 transition-all duration-300 hover:bg-blue-500 hover:shadow-lg mt-auto"
            data-tooltip-id="goBackTooltip"
            aria-label="Go Back"
          >
            <FaArrowLeft className="mr-4 text-2xl" />
            <div className="flex text-2xl">Back</div>
          </button>
          <Tooltip
            id="goBackTooltip"
            content="Go Back"
            place="top"
            className="tooltip-custom"
          />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Sidebar;
