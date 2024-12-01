import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
});