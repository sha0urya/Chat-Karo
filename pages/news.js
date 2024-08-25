import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("technology");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const categories = [
    { id: "general", label: "Uncategorized News" },
    { id: "business", label: "Business News" },
    { id: "entertainment", label: "Entertainment News" },
    { id: "sports", label: "Sports News" },
    { id: "technology", label: "Technology News" },
    { id: "health", label: "Health News" },
    { id: "science", label: "Science News" },
  ];

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const baseUrl = "http://api.mediastack.com/v1/news";
        let params = {
          access_key: process.env.NEXT_PUBLIC_MEDIASTACK_API_KEY,
          countries: "in",
          languages: "en",
        };

        if (category !== "general") {
          params.categories = category;
        } else if (query) {
          params.keywords = query;
        }

        const { data } = await axios.get(baseUrl, { params });
        setAllNews(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news: ", err);
        setError("Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, query]);

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    setPage(1);
    setLoading(true);
  };

  const handleSearch = () => {
    setCategory("general");
    setPage(1);
    setLoading(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Paginate the news data
  const paginatedNews = allNews.slice((page - 1) * limit, page * limit);

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
        onClose={closeSidebar}
        categories={categories}
        category={category}
        handleCategoryClick={handleCategoryClick}
        handleGoBack={handleGoBack}
      />
      <MainContent
        news={paginatedNews}
        loading={loading}
        error={error}
        page={page}
        setPage={setPage}
        limit={limit}
        totalResults={allNews.length}
      />
    </div>
  );
};

export default News;
