const lineCamp = require('@tailwindcss/line-clamp');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/templates/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // white
        white100: '#FFFFFF',
        // blue
        blue100: '#92b7f6',
        blue200: '#024AAD',
        blue300: '#232E52',
        // gray
        gray100: '#AAAAAA',
      },
    },
    screens: {
      sm: { max: '576px' },
      md: { max: '768px' },
    },
  },
  plugins: [lineCamp],
};
