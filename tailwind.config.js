export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        script: ['"Dancing Script"', "cursive"],
      },
      colors: {
        velvet: "#14060c",
        wine: "#3a0d1c",
        blush: "#f7d9d6",
        rosegold: "#e8b4a0",
        champagne: "#f4e3bd",
      },
    },
  },
  plugins: [],
};
