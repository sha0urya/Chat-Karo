import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({
  weather,
  isDarkMode,
  isCelsius,
  convertTemperature,
  toggleTemperatureUnit,
  toDateFunction,
}) => (
  <div
    className={`flex flex-col w-[100%] items-center mt-6 p-4 ${
      isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
    } shadow-lg rounded-lg transition-all duration-300`}
  >
    {/* City, Country, and Date */}
    <div className="text-center mb-4">
      <div className="text-2xl font-semibold">
        {weather.data.name}, {weather.data.sys.country}
      </div>
      <div className="text-lg font-medium">{toDateFunction()}</div>
    </div>

    {/* Temperature, Min/Max Temp, and Description */}
    <div className="flex flex-col items-center text-center text-lg font-medium space-y-4">
      <div className="flex items-center text-5xl font-bold">
        <Image
          src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@4x.png`}
          alt={weather.data.weather[0].description}
          width={80}
          height={40}
        />
        <span className="ml-4">
          {convertTemperature(weather.data.main.temp)}
        </span>
        <sup className="text-2xl align-super">{isCelsius ? "°C" : "°F"}</sup>
      </div>
      <div className="text-xl capitalize">
        {weather.data.weather[0].description}
      </div>
      <div className="flex justify-between w-full px-6 text-lg">
        <div>
          <FontAwesomeIcon
            icon={faTemperatureLow}
            className="text-blue-500 mr-2"
          />
          Min: {convertTemperature(weather.data.main.temp_min)}
          <sup>{isCelsius ? "°C" : "°F"}</sup>
        </div>
        <div >
          <FontAwesomeIcon
            icon={faTemperatureHigh}
            className="text-red-500 ml-5 pr-1"
          />
          Max: {convertTemperature(weather.data.main.temp_max)}
          <sup>{isCelsius ? "°C" : "°F"}</sup>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        onClick={toggleTemperatureUnit}
      >
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  </div>
);

export default WeatherCard;
