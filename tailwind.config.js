const lineCamp = require('@tailwindcss/line-clamp');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/templates/**/*.{ts,tsx}',
  ],
  plugins: [lineCamp],
  theme: {
    extend: {
      colors: {
        // black
        black100: '#000000',
        black200: '#202020',
        // blue
        blue100: '#92b7f6',
        blue200: '#024AAD',
        blue300: '#232E52',
        // gray
        gray100: '#AAAAAA',
        // white
        white100: '#FFFFFF',
      },
    },
    screens: {
      md: { max: '768px' },
      sm: { max: '576px' },
    },
  },
};
