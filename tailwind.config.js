/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
      fontFamily: {
        'oswald': ['Oswald'],
        'merriweather': ['Merriweather'],
       },
       colors: {
        "dodger-blue":"#008ae6"
       }
    },
    plugins: [],
  };