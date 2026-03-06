/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        primaryLight: '#EDE9FE',
        surface: '#FFFFFF',
        background: '#F5F5F5',
        inputPlaceholder: '#737373',
      },
    },
  },
  plugins: [],
};
