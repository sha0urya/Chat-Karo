import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Pagination from "../Pagination";
import Loader from "@/components/Loader";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

const MainContent = ({ loading, news, totalResults, limit, page, setPage }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-[100%] p-4">
      {loading ? (
        <Loader />
      ) : news && news.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center bg-blue-100 rounded-3xl shadow-lg m-4 hover:shadow-2xl transition-shadow duration-300 dark:bg-slate-700">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
          {totalResults > limit && (
            <Pagination
              limit={limit}
              total={totalResults}
              activePage={page}
              setActivePage={setPage}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-4">
          <Image
            src="/underConstruction.jpeg"
            alt="Under Construction"
            className="w-full max-w-2xl h-auto"
            width={500}
            height={500}
          />
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-8 p-3 rounded-full bg-blue-500 text-white text-2xl shadow-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Scroll to Top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default MainContent;
