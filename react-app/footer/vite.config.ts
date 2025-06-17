// host-react\vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import * as path from "path";
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
    federation({
      name: "footerApp",
      // remotes: {},
      // remotes: {
        // remoteVue: 'remoteVue@http://localhost:5001/assets/remoteEntry.js',
      // },
      exposes: {
        "./Footer": "./src/components/Footer",
        "./App": "./src/App.tsx"  // Add this line
      },
      shared: ["react", "react-dom",]
    }),
  ],
  server: {
    port: 5002,
    strictPort: true,
    // cors: true,
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
    port: 5002,
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
    cssCodeSplit: false,
  },
});