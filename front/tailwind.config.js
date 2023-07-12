/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Rubik"],
      },
      colors: {
        main: "#FF810A",
        second: "#221B1C",
      },
    },
    screens: {
      "sm-height": { raw: "(max-height: 770px), (min-width: 1024px)" },
    }
  },
  extend: {},
  plugins: [],
};
