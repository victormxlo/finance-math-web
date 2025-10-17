/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        destructive: "#ef4444", // red-500
        "destructive-foreground": "#ffffff", // texto branco
      }
    },
  },
  plugins: [],
};