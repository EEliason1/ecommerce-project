module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          light: "#1A1A1A",
        },
        green: {
          forest: "#228B22",
          light: "#34D399",
        },
        gray: {
          accent: "#6B7280",
          light: "#D1D5DB",
        },
      },
      gradientColorStops: {
        green: {
          forest: "#228B22",
          light: "#34D399",
        },
      },
    },
  },
  plugins: [],
};
