import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Creating a separate vendor chunk for React dependencies
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjusting the chunk size warning limit
  },
});
