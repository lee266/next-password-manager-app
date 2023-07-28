/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1976D2',
          dark: '#123490',
        },
        accent: {
          DEFAULT: '#24AAB4',
          dark: '#789abc',
        },
        back: {
          DEFAULT: '#ffffff',
          dark: '#091A47',
          rightDark: '#1A2229'
        },
      }
    },
  },
  plugins: [],
}

