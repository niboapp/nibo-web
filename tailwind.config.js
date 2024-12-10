/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-active': '#F606BA',      // Pinkish active color
        'bg-primary': '#F9F9F9',     // Dark background color
        'bg-light': '#D3D3D3',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
