/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}', // Ensure all relevant files are included
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: 
    [
      "corporate",
      "dracula",
      "retro",
      "aqua"
    ],
  },
};
