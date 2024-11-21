/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}', // Ensure all relevant files are included
    './public/**/*.html',
  ],
  theme: {
    extend: {
      scale: {
        '50': '0.5',
        '60': '0.6',
        '75': '0.75',
        '100': '1',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'corporate',
      'dracula',
      'retro',
      'aqua',
    ],
  },
};
