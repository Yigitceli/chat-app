module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#201c1c",
        secondary: "#d8046c",
      },
      padding: {
        13: "130px",        
        25: "60px",
        30: "200px",
      },
      height: {
        6: "60px",
      },
      width: {
        200: "500px"
      },
      colors:{
        secondary: "#d8046c",
      }
      
    },
  },
  plugins: [],
};
