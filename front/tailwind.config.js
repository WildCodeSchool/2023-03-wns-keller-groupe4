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
      "sm": { raw: "(min-width: 640px)" },
      "md": { raw: "(min-width: 768px)" },
      "lg": { raw: "(min-width: 1024px)" },
      "xl": { raw: "(min-width: 1280px)" },
      "2xl": { raw: "(min-width: 1536px)" },
      "sm-height": { raw: "(max-height: 770px), (min-width: 1024px)" },
    }
  },
  extend: {},
  plugins: [],
};
