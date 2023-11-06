/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: '10px 10px 15px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
