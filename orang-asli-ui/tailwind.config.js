/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"],
      },
      colors: {
        // "primary-font-color": "#",
        // "primary-background-color": "#e64320",
      },
    },
  },
  plugins: [],
};
