import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faWater,
  faTachometerAlt,
  faEye,
  faSunrise,
  faSunset,
} from "@fortawesome/free-solid-svg-icons";

const AdditionalWeatherDetails = ({ weather, formatTime, isDarkMode }) => (
  <div
    className={`mt-6 w-full px-4 py-2 rounded-lg shadow-lg ${
      isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
    }`}
  >
    {/* Wind Speed, Humidity, Pressure */}
    <div className="flex justify-around text-lg">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faWind} className="text-blue-500 mb-1" />
        <p>{weather.data.wind.speed} km/h</p>
        <p className="text-sm">Wind Speed</p>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faWater} className="text-blue-500 mb-1" />
        <p>{weather.data.main.humidity} %</p>
        <p className="text-sm">Humidity</p>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faTachometerAlt}
          className="text-blue-500 mb-1"
        />
        <p>{weather.data.main.pressure} hPa</p>
        <p className="text-sm">Pressure</p>
      </div>
    </div>

    {/* Visibility, Sunrise, Sunset */}
    <div className="flex justify-around mt-4 space-x-8 text-lg">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faEye} className="text-blue-500 mb-1" />
        <p>{weather.data.visibility / 1000} km</p>
        <p className="text-sm">Visibility</p>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faSunrise} className="text-yellow-500 mb-1" />
        <p>{formatTime(weather.data.sys.sunrise)}</p>
        <p className="text-sm">Sunrise</p>
      </div>
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faSunset} className="text-orange-500 mb-1" />
        <p>{formatTime(weather.data.sys.sunset)}</p>
        <p className="text-sm">Sunset</p>
      </div>
    </div>
  </div>
);

export default AdditionalWeatherDetails;
