import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY; // Store your API key securely

const fetchNews = async (category, query = "") => {
  try {
    const baseUrl = "https://google-news13.p.rapidapi.com";
    const urlMap = {
      latest: `${baseUrl}/latest?lr=en-US`,
      entertainment: `${baseUrl}/entertainment?lr=en-US`,
      world: `${baseUrl}/world?lr=en-US`,
      business: `${baseUrl}/business?lr=en-US`,
      health: `${baseUrl}/health?lr=en-US`,
      sport: `${baseUrl}/sport?lr=en-US`,
      science: `${baseUrl}/science?lr=en-US`,
      technology: `${baseUrl}/technology?lr=en-US`,
      search: `${baseUrl}/search?keyword=${query}&lr=en-US`, // Search endpoint
    };

    const url = query ? urlMap.search : urlMap[category]; // Use search URL if query exists
    const { data } = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "google-news13.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    });

    return data.items;
  } catch (error) {
    console.error(`Error fetching ${category} news: `, error);
    throw new Error("Failed to fetch news. Please try again later.");
  }
};

export default fetchNews;
