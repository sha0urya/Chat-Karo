import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ClickAwayListener from "react-click-away-listener";
import { FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Tooltip } from "react-tooltip"; // Import Tooltip
import "react-tooltip/dist/react-tooltip.css"; // Import CSS if necessary

const ITEMS_PER_PAGE = 5;
const MAX_SNIPPET_WORDS = 6;

const SearchInMsg = () => {
  const { currentUser } = useAuth();
  const { data } = useChatContext();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const chatContainerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const chatRef = doc(db, "chats", data.chatId);
      getDoc(chatRef).then((chatDoc) => {
        if (chatDoc.exists()) {
          const messages = chatDoc.data().messages || [];
          const filtered = messages.filter((message) =>
            message.text.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredMessages(filtered);
          setCurrentPage(0); // Reset to the first page when search query changes
        }
      });
    } else {
      setFilteredMessages([]); // Reset when search query is empty
      setCurrentPage(0); // Reset page when search query is empty
    }
  }, [searchQuery, data.chatId]);

  const handleClickAway = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setSearchActive(false);
      setSearchQuery(""); // Clear the search input field
    }
  };

  const handleNavigateToMessage = (messageId) => {
    const chatMessages = chatContainerRef.current?.children;
    if (chatMessages) {
      const targetMessage = Array.from(chatMessages).find(
        (msg) => msg.dataset.messageId === messageId
      );
      if (targetMessage) {
        targetMessage.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < filteredMessages.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const paginatedMessages = filteredMessages.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Function to truncate message text to a maximum of 6 words
  const getSnippet = (text) => {
    const words = text.split(" ");
    if (words.length > MAX_SNIPPET_WORDS) {
      return words.slice(0, MAX_SNIPPET_WORDS).join(" ") + " ...";
    }
    return text;
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative">
        {/* Search Icon */}
        <div
          className={`cursor-pointer p-2 rounded-full ${
            searchActive
              ? "bg-black text-white"
              : "hover:bg-gray-200 dark:hover:bg-gray-800"
          }`}
          onClick={() => setSearchActive((prev) => !prev)}
        >
          <FiSearch size={20} />
        </div>

        {/* Conditional Search Input */}
        {searchActive && (
          <div
            ref={menuRef}
            className="w-[400px] absolute top-[65px] right-20 flex-1 justify-center text-center bg-c0 z-10 overflow-hidden shadow-md p-3 rounded-lg"
          >
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded-md border text-gray-800 border-gray-300 outline-none"
            />
            <div className="mt-2 max-h-[300px] overflow-y-auto">
              {filteredMessages.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {filteredMessages.length} result(s) -{" "}
                      {currentPage * ITEMS_PER_PAGE + 1} -{" "}
                      {Math.min(
                        (currentPage + 1) * ITEMS_PER_PAGE,
                        filteredMessages.length
                      )}
                    </span>
                    <div className="flex space-x-2">
                      {currentPage > 0 && (
                        <button
                          onClick={handlePreviousPage}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <FiChevronUp size={16} />
                        </button>
                      )}
                      <button
                        onClick={handleNextPage}
                        disabled={
                          (currentPage + 1) * ITEMS_PER_PAGE >=
                          filteredMessages.length
                        }
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <FiChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                  {paginatedMessages.map((message) => (
                    <div
                      key={message.id}
                      data-tooltip-id={message.id} // Tooltip ID
                      className="p-2 text-sm text-gray-800 bg-green-100 rounded-md mb-1 cursor-pointer"
                      onClick={() => handleNavigateToMessage(message.id)}
                    >
                      {getSnippet(message.text)}
                      {/* Tooltip Component for each message */}
                      <Tooltip id={message.id} content={message.text} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-sm text-gray-400">No messages found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchInMsg;
