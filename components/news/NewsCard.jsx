import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="max-w-sm rounded-3xl min-h-[220px] flex flex-col overflow-hidden shadow-lg m-4 glass-effect hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800">
      <img
        className="w-full h-48 object-cover"
        src={article?.image || "/ERROR_GIF.jpeg"}
        alt={article?.title}
        width={400}
        height={400}
      />
      <div className="flex-1 px-6 py-2">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
          {/* Using dangerouslySetInnerHTML for title */}
          <div dangerouslySetInnerHTML={{ __html: article.title }} />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {/* Using dangerouslySetInnerHTML for description */}
          <span
            dangerouslySetInnerHTML={{
              __html: article.description
                ? article.description.slice(0, 100) + "..."
                : "No description available.",
            }}
          />
        </p>
      </div>
      <div className="px-6 pt-2 pb-3 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
        <span className="flex bg-blue-200 dark:bg-blue-500 rounded-full px-3 text-center py-1 text-xs font-semibold text-gray-700 dark:text-gray-100 mr-2 mb-2">
          {new Date(article.published_at).toLocaleDateString()}
        </span>
        <span className="flex bg-green-200 dark:bg-green-500 rounded-full text-center px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-100 mr-2 mb-2">
          {article.author || "Unknown"}
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex bg-blue-500 mb-2 dark:bg-blue-600 text-white text-center px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
