import React, { useEffect, useState } from "react";
import axios from "axios";
import ThemeToggle from "@/components/weather/ThemeToggle";
import SearchBar from "@/components/weather/SearchBar";
import WeatherCard from "@/components/weather/WeatherCard";
import AdditionalWeatherDetails from "@/components/weather/AdditionalWeatherDetails";
import HourlyWeather from "@/components/weather/HourlyWeather";
import DailyWeather from "@/components/weather/DailyWeather";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/weather/Header";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

function WeatherNow() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState(""); // Add this state

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temp) => {
    return isCelsius ? Math.round(temp) : Math.round(temp * 1.8 + 32);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const regex = /^[a-zA-Z\s]+$/; // Only allow letters and spaces
      if (!regex.test(input)) {
        toast.error(
          "Invalid input. Please enter a city name using only letters and spaces."
        );
        return;
      }

      setCity(input); // Set city state here
      setInput("");
      setWeather({ ...weather, loading: true });

      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

      try {
        const res = await axios.get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        });
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        setInput("");
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className={`relative flex flex-col h-[70%] items-center w-[94%] ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-r from-blue-50 to-blue-200 text-gray-800"
        } mx-auto mt-12 rounded-lg pb-8 shadow-lg p-6 transition-all duration-300`}
      >
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <h1
          className={`text-4xl font-extrabold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          } animate-bounce`}
        >
          {`Discover Your City's Weather`}
        </h1>
        <SearchBar
          input={input}
          setInput={setInput}
          search={search}
          isDarkMode={isDarkMode}
        />

        {weather.loading && (
          <div className="mt-8 animate-pulse">
            <Oval type="Oval" color="#1d4ed8" height={80} width={80} />
          </div>
        )}

        {weather.error && (
          <div className="mt-8 text-red-600 text-2xl animate-shake">
            <FontAwesomeIcon icon={faFrown} />
            <span className="ml-2">Oops! City not found</span>
          </div>
        )}

        {weather.data.main && (
          <>
            <WeatherCard
              weather={weather}
              isDarkMode={isDarkMode}
              isCelsius={isCelsius}
              convertTemperature={convertTemperature}
              formatTime={formatTime}
              toggleTemperatureUnit={toggleTemperatureUnit}
              toDateFunction={toDateFunction}
            />
            <AdditionalWeatherDetails
              weather={weather}
              formatTime={formatTime}
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {city && (
          <>
            <HourlyWeather city={city} isDarkMode={isDarkMode} />
            <DailyWeather location={city} isDarkMode={isDarkMode} />
          </>
        )}
      </div>
    </>
  );
}

export default WeatherNow;
