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
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        matrix: "rgb(var(--color-matrix) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)", /* Wajib ada untuk mode terang/gelap */
        'dark-overlay': 'rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}