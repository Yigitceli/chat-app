module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#201c1c",
        secondary: "#d8046c",
        layout: "#363333",
      },
      padding: {
        13: "130px",
        25: "60px",
        30: "200px",
      },
      height: {
        6: "60px",
        600: "200px",
      },
      width: {
        200: "500px",
      },
      colors: {
        main: "#201c1c",
        secondary: "#d8046c",
      },
      keyframes: {
        grow: {
          "0%, 100%": { transform: "scale(2,2)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    // ...
  ],
};
