module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cfeeff",
          900: "#0031a7",
        },
        secondary: {
          100: "#f3ffc7",
          900: "#3e580f",
        },

        light: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
