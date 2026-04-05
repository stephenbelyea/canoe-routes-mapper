import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/canoe-routes-mapper",
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@vectoricons/atlas-icons-react",
      "@babel/runtime/helpers/extends",
    ],
  },
  build: {
    outDir: "./docs",
  },
});
