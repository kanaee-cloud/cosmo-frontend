/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Lexend", "sans-serif"],
        secondary: ["Silkscreen", "monospace"],
        tertiary: ["VT323", "monospace"],
        press: ['"Press Start 2P"', "cursive"]
      },
      colors: {
        primary: "#0d0514",
        secondary: "#1a0b2e",
        tertiary: "#140724",
        light: "#8a6dfc",
        accent: "#ff0055",
        'dark-overlay': 'rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

