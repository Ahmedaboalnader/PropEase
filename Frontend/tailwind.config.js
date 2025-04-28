/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               
    "./src/**/*.{js,jsx,ts,tsx}"  
  ],
  theme: {
    extend: {
      colors: {
        main: "#1F4B43",
        hover: "#0c332e",
        yellowCustom:"#E7C873",
        bg:"#FFF8F6",
        text: "#769F7D",
        logout: "#AE2E2E",
      },
    },
  },
  plugins: [],
}

