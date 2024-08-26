/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c0: "#101010",
        c1: "#131313",
        c2: "#202329",
        c3: "#8B8D93",
        c4: "#6b8afd",
        c5: "#2E343D",
        "brand-primary": "#414DFF",
        "brand-secondary": "#ffffff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        "transform-opacity": "transform, opacity",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(4px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-in-out",
        fadeOut: "fadeOut 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};
