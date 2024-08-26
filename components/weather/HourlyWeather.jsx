import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

function HourlyWeather({ city, isDarkMode }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    const fetchHourlyData = async () => {
      const url = `https://apjoy-weather-forecast.p.rapidapi.com/forecast?location=${city}&days=8`;
      const options = {
        headers: {
          "x-rapidapi-host": "apjoy-weather-forecast.p.rapidapi.com",
          "x-rapidapi-key": process.env.NEXT_PUBLIC_OPEN_WEATHER_RAPID_API_KEY,
        },
      };

      try {
        const response = await axios.get(url, options);
        const data = response.data.list;

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

        const todayHourlyData = data.filter((item) => {
          const itemDate = new Date(item.dt_txt).getTime();
          return itemDate >= startOfDay && itemDate <= endOfDay;
        });

        setHourlyData(todayHourlyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the weather data:", error);
        setLoading(false);
      }
    };

    if (city) {
      fetchHourlyData();
    }
  }, [city]);

  const handleCardClick = (hour) => {
    setSelectedHour(hour);
  };

  const closeModal = () => {
    setSelectedHour(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  if (loading)
    return (
      <div
        className={`h-32 flex text-center items-center justify-center ${
          isDarkMode ? "dark:bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div>
          <Image src="/sloader.svg" alt="Loading..." width={40} height={40} />
        </div>
      </div>
    );

  return (
    <div
      className={`bg-[#04244d] ${
        isDarkMode ? "dark:bg-[#001f3f]" : "bg-[#001f3f]"
      } w-[100%] p-4 rounded-md flex justify-center`}
    >
      <div className="absolute">
        <h2
          className={`text-white ${
            isDarkMode ? "dark:text-gray-300" : "text-gray-300"
          } text-xl font-bold mb-2`}
        >
          Hourly Forecast for {city}
        </h2>
      </div>
      <div className="flex mt-4 p-10 space-x-2 overflow-x-auto">
        {hourlyData && hourlyData.length > 0 ? (
          hourlyData.map((hour, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(hour)}
              className={`flex flex-col items-center ${
                isDarkMode ? "bg-[#003366]" : "bg-[#042f63]"
              } p-2 rounded-lg ${
                index === 0 ? "border-2 border-white" : ""
              } cursor-pointer`}
            >
              <p
                className={`text-white ${
                  isDarkMode ? "dark:text-gray-200" : "text-gray-200"
                } text-sm`}
              >
                {new Date(hour.dt_txt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <Image
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0].description}
                className="w-8 h-8"
                width={40}
                height={40}
              />
              <p
                className={`text-white ${
                  isDarkMode ? "dark:text-gray-200" : "text-gray-200"
                } text-lg`}
              >
                {Math.round(hour.main.temp)}°C
              </p>
            </div>
          ))
        ) : (
          <div
            className={`text-white ${
              isDarkMode ? "dark:text-gray-300" : "text-gray-300"
            }`}
          >
            No hourly data available.
          </div>
        )}
      </div>

      {selectedHour && (
        <div
          id="modal-overlay"
          className={`glass-effect fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
          onClick={handleOutsideClick}
        >
          <div
            className={`bg-white ${
              isDarkMode ? "dark:bg-gray-800" : "bg-gray-800"
            } text-slate-700 ${
              isDarkMode ? "dark:text-gray-300" : "text-gray-800"
            } p-6 rounded-lg shadow-lg max-w-lg w-full`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "dark:text-gray-300" : "text-gray-800"
              }`}
            >
              Weather Details
            </h2>
            <div className="flex justify-between mb-2">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Time
                </p>
                <p className="font-bold">
                  {new Date(selectedHour.dt_txt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Image
                src={`https://openweathermap.org/img/wn/${selectedHour.weather[0].icon}.png`}
                alt={selectedHour.weather[0].description}
                className="w-12 h-12"
                width={48}
                height={48}
              />
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Temperature
                </p>
                <p className="font-bold">
                  {Math.round(selectedHour.main.temp)}°C
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Feels Like
                </p>
                <p className="font-bold">
                  {Math.round(selectedHour.main.feels_like)}°C
                </p>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Humidity
                </p>
                <p className="font-bold">{selectedHour.main.humidity}%</p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Pressure
                </p>
                <p className="font-bold">{selectedHour.main.pressure} hPa</p>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Wind Speed
                </p>
                <p className="font-bold">{selectedHour.wind.speed} m/s</p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "dark:text-gray-300" : "text-gray-800"
                  }`}
                >
                  Wind Gust
                </p>
                <p className="font-bold">{selectedHour.wind.gust} m/s</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className={`mt-4 bg-blue-500 ${
                isDarkMode ? "dark:bg-blue-700" : "bg-blue-700"
              } text-white ${
                isDarkMode ? "dark:text-gray-200" : "text-gray-800"
              } py-2 px-4 rounded transition-transform transform hover:scale-105 active:scale-95 hover:bg-blue-600 ${
                isDarkMode ? "dark:hover:bg-blue-800" : "hover:bg-blue-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? "dark:focus:ring-blue-300" : "focus:ring-blue-800"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HourlyWeather;
