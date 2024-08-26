import React from "react";
import HourlyWeather from "@/components/weather/HourlyWeather";
import DailyWeather from "@/components/weather/DailyWeather";
import { ToastContainer } from "react-toastify";

const WeatherFooter = () => (
  <>
    <HourlyWeather />
    <DailyWeather />
    <ToastContainer />
  </>
);

export default WeatherFooter;
