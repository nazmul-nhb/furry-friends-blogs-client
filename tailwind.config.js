/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sourceSans: '"Source Sans 3", sans-serif;',
        kreonSerif: '"Kreon", serif;',
        jokeyOneSans: '"Jockey One", sans-serif;',
      },
    },
  },
  plugins: [],
}
