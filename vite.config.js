import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.foxithub.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/biometric-api": {
        target: "https://tbbtech.xyz",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/(api|biometric-api)/, ""),
      },
      "/crete-nid-api": {
        target: "https://esservice.pythonanywhere.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/(api|biometric-api|crete-nid-api)/, ""),
      },
    },
  },
});
