import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/news/Navbar";
import Sidebar from "../components/news/Sidebar";
import MainContent from "../components/news/MainContent";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import fetchNews from "@/utils/fetchNews";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("latest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const categories = [
    { id: "latest", label: "Latest News" },
    { id: "entertainment", label: "Entertainment News" },
    { id: "world", label: "World News" },
    { id: "business", label: "Business News" },
    { id: "health", label: "Health News" },
    { id: "sport", label: "Sports News" },
    { id: "science", label: "Science News" },
    { id: "technology", label: "Technology News" },
  ];

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  const handleSearch = async () => {
    setCategory(""); // Reset category to avoid filtering by category
    setPage(1);
    setLoading(true); // Set loading to true before fetching data
    try {
      const searchResults = await fetchNews("search", query); // Fetch search results
      setAllNews(searchResults);
    } catch (err) {
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    const getNews = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const newsData = await fetchNews(category);
        setAllNews(newsData);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (!query) {
      getNews();
    }
  }, [category, query]);

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    setPage(1);
    setQuery(""); // Clear any search query when selecting a category
  };

  return (
    <div className="container mx-auto">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        category={category} // Pass the category state here
        setCategory={setCategory} // Pass the setCategory function to allow updating the category
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
        category={category}
        handleCategoryClick={handleCategoryClick}
      />

      <MainContent
        news={allNews.slice((page - 1) * limit, page * limit)}
        loading={loading} // Pass the loading state
        error={error} // Pass the error state
        page={page}
        setPage={setPage}
        limit={limit}
        totalResults={allNews.length}
      />
    </div>
  );
};

export default News;
