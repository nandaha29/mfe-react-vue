// host-react\vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import * as path from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "contactApp",
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5007,
    strictPort: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  },
  preview: {
    port: 5007,
  },
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    outDir: "dist",
    cssCodeSplit: false,
  },
});