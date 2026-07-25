/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moneta-dark': '#0b1317',
        'moneta-card': '#161f24',
        'moneta-green': '#34d399',
      },
    },
  },
  plugins: [],
}