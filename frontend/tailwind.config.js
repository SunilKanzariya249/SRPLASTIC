/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e6f0fa',
          DEFAULT: '#0f294a', // Dark Navy
          dark: '#07162c',
        },
        secondary: {
          light: '#fff5d6',
          DEFAULT: '#e5b800', // Gold/Accent
          dark: '#b28f00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
