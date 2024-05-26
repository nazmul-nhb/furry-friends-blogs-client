/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
      colors: {
        'furry': '#1e40ad',
      },
      fontFamily: {
        sourceSans: '"Source Sans 3", sans-serif;',
        kreonSerif: '"Kreon", serif;',
        jokeyOneSans: '"Jockey One", sans-serif;',
      },
    },
  },
  plugins: [],
}
