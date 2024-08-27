import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  WiThermometer,
  WiHumidity,
  WiRain,
  WiStrongWind,
  WiSolarEclipse,
  WiSunrise,
  WiSunset,
  WiMoonrise,
  WiMoonset,
  WiMoonAltWaningCrescent4,
} from "react-icons/wi";
import { Transition } from "@headlessui/react";
import Image from "next/image";

function DailyWeather({ location }) {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchDailyData = async () => {
      const api_key = process.env.NEXT_PUBLIC_RAPIDAPI_KEY_DAY;
      const city = location;
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=50`;

      try {
        const response = await axios.get(url, {
          headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key": api_key,
          },
        });

        const forecast = response.data.forecast.forecastday;
        setDailyData(forecast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the weather data:", error);
        setLoading(false);
      }
    };

    if (location) {
      fetchDailyData();
    }
  }, [location]);

  const handleDayClick = (day) => {
    setSelectedDay(day === selectedDay ? null : day);
  };

  if (loading)
    return (
      <div className="h-32 flex text-center items-center justify-center ">
        <div>
          <Image src="/sloader.svg" alt="Loading..." width={40} height={40} />
        </div>
      </div>
    );

  return (
    <div className="w-full flex justify-center bg-slate-700 pb-4 p-2 rounded-md">
      <div className="daily-weather w-[90%] flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-2xl mb-6 text-slate-800 dark:text-slate-200 font-bold text-center">
          Forecast for {location}
        </h2>
        <div className="space-y-4">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="glass-effect flex flex-col bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-4 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 shadow-md"
              onClick={() => handleDayClick(day)}
            >
              <div className=" flex justify-between items-center">
                <p>
                  {new Date(day.date).toLocaleDateString([], {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <img
                  src={
                    day.day.condition?.icon
                      ? `https:${day.day.condition.icon}`
                      : "default-icon.png"
                  }
                  alt={day.day.condition?.text || "No description"}
                  className="w-12 h-12"
                />
                <p>
                  {Math.round(day.day.mintemp_c)}°C /{" "}
                  {Math.round(day.day.maxtemp_c)}°C
                </p>
              </div>

              <Transition
                show={selectedDay === day}
                enter="fade-in"
                enterFrom="transform opacity-0 translate-y-4"
                enterTo="transform opacity-100 translate-y-0"
                leave="fade-out"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 translate-y-4"
              >
                <div className="mt-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <WiThermometer className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Temperature:</strong>{" "}
                        {Math.round(day.day.avgtemp_c)}°C
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiHumidity className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Humidity:</strong> {day.day.avghumidity}%
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiRain className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Precipitation:</strong> {day.day.totalprecip_mm}{" "}
                        mm
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiStrongWind className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Wind Speed:</strong> {day.day.maxwind_kph} kph
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiSolarEclipse className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>UV Index:</strong> {day.day.uv}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiSunrise className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Sunrise:</strong> {day.astro.sunrise}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiSunset className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Sunset:</strong> {day.astro.sunset}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiMoonrise className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Moonrise:</strong> {day.astro.moonrise}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiMoonset className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Moonset:</strong> {day.astro.moonset}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiMoonAltWaningCrescent4 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Moon Phase:</strong> {day.astro.moon_phase}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiThermometer className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Max Temp:</strong>{" "}
                        {Math.round(day.day.maxtemp_c)}
                        °C
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <WiThermometer className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <p>
                        <strong>Min Temp:</strong>{" "}
                        {Math.round(day.day.mintemp_c)}
                        °C
                      </p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DailyWeather;
