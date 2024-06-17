import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { "@": path.resolve(__dirname, "/src") } },
  server: {
    proxy: {
      "/user": {
        target: "https://10.111.10.43",
        changeOrigin: true,
        secure: false,
      },
      "/verifyProxy": {
        target: "https://10.111.10.43",
        changeOrigin: true,
        secure: false,
      },
      "/isoc": {
        target: "https://10.111.10.43",
        changeOrigin: true,
        secure: false,
      },
      "/isop": {
        target: "https://10.111.10.43",
        changeOrigin: true,
        secure: false,
      },
      "/asset": {
        target: "https://10.111.10.43",
        changeOrigin: true,
        secure: false,
      },
      // "/isoc": "https://10.111.10.43",
      // "/isop": "https://10.111.10.43",
      // "/user": "https://10.111.10.43",
      // "/verifyProxy": "https://10.111.10.43",
    },
  },
});
