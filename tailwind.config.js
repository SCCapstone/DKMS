/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./pages/**/*.tsx", "./ui/**/*.tsx"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};
