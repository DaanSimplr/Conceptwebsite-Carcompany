import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  // Op GitHub Pages staat de site op /<repo-naam>/; de deploy-workflow geeft dat pad mee via BASE_PATH.
  base: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
