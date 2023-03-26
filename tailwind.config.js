/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        spotify: "#1DB954",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};
