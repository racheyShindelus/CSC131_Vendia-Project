/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
}
