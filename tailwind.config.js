/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Inclui todos os arquivos da pasta src
  ],
  darkMode: 'class', // Habilita o dark mode manual
  theme: {
    extend: {},
  },
  plugins: [],
}