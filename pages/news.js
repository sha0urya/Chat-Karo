import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";
import NewsCard from "../components/NewsCard";
import CategoryButton from "../components/CategoryButton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useAuth } from "@/context/authContext";
import Loader from "@/components/Loader";
import { Tooltip } from "react-tooltip"; // Correct import
import "react-tooltip/dist/react-tooltip.css"; // Import CSS

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("headlines");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [limit, setLimit] = useState(9);
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light"
  );

  const categories = [
    { id: "general", label: "General" },
    { id: "business", label: "Business" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
    { id: "technology", label: "Technology" },
  ];

  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=${limit}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
        if (category !== "headlines") {
          url += `&category=${category}`;
        } else if (query) {
          url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${limit}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
        }

        const response = await axios.get(url);
        setNews(response.data.articles);
        setTotalResults(response.data.totalResults);
        setLoading(false);
      } catch (err) {
        setError("Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, query, page, limit]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setQuery("");
    setPage(1);
  };

  const handleSearch = () => {
    setCategory("headlines");
    setPage(1);
    setLoading(true);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto">
      <div className="p-1 px-6 w-full flex justify-between items-center bg-brand-primary">
        <div className="text-brand-secondary">
          <div className="text-4xl font-bold animate-pulse">Chat-Karo</div>
          <div className="text-2xl font-semibold text-center">News</div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Go Back Button with Tooltip */}

          <div className="flex justify-center mt-6 space-x-8 mb-5 m-4">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                cat={cat}
                isSelected={category === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              />
            ))}
          </div>

          <SearchBar
            query={query}
            onQueryChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            className="flex justify-center mt-3"
          />

          <button
            onClick={toggleTheme}
            className="text-2xl text-gray-800 dark:text-gray-200"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <button
            onClick={handleGoBack}
            className="text-2xl text-gray-800 dark:text-gray-200"
            data-tooltip-id="goBackTooltip" // Updated data attribute for the tooltip
          >
            <FaArrowLeft />
          </button>
          <Tooltip id="goBackTooltip" content="Go Back" place="top" />
          
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="flex flex-col mt-4 items-center justify-center">
          <img
            src="/underConstruction.jpeg"
            alt="Under Construction"
            className="w-full max-w-2xl h-auto"
            width="100%"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center rounded-3xl shadow-slate-600 m-4 hover:shadow-2xl transition-shadow duration-300 ease-in-out dark:hover:shadow-slate-600 dark:hover:shadow-2xl">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
          {totalResults > limit ? (
            <Pagination
              limit={limit}
              total={totalResults}
              activePage={page}
              setActivePage={setPage}
            />
          ) : (
            <img
              src="/empty.png"
              alt="Under Construction"
              className="w-full h-auto"
              width="100%"
            />
          )}
        </>
      )}
    </div>
  );
};

export default News;
