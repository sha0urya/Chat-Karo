/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "openweathermap.org",
      "cdn.weatherapi.com",
    ],
  },
};

module.exports = nextConfig
