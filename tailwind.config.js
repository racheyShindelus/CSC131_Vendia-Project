/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: '5px 5px 10px 0px rgba(0, 0, 0, 0.1)',
      },
      width: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
}
