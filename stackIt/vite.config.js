import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // or 'globalThis' if you prefer
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "window", // polyfill global for esbuild optimizer
      },
    },
  },
});
