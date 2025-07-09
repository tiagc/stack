/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stackYellow: "#EEF41A",
        stackGreen: "#22CE6D",
        stackOrange: "#FE8339",
        stackLightGray: "#B1DDDC",
        stackBlue: "#7187FF",
        stackPink: "#FE99C9",
        stackRed: "#FD5D5C",
        stackBabyBlue: "#9DCCFC",
        stackMint: "#2CD2A7",
        stackGray: "#8B8BAE",
      },
      fontFamily: {
        neue: ['"Helvetica Neue"', "Arial", "sans-serif"],
        geist: ['"Geist Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
