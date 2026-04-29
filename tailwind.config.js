/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#2DD4BF', // Teal
        'surface': '#000000', // DARK black
        'text-primary': '#FFFFFF',
        'text-muted': '#9CA3AF',
      },
    },
  },
  plugins: [],
}
