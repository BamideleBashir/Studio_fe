/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A40FE6",
        },
        bg: {
          DEFAULT: "#f3f3f1",
        },
        blue: {
          DEFAULT: "#256FFF",
        },
      },
    },
  },
  plugins: [],
}

