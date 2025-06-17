// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// host-react\vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// import path from "path";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "hostapp",
      // remotes: {},
      remotes: {
        navbarApp: 'http://localhost:5001/assets/remoteEntry.js',
        footerApp: 'http://localhost:5002/assets/remoteEntry.js',
        homeApp: 'http://localhost:5003/assets/remoteEntry.js',
        serviceApp: 'http://localhost:5004/assets/remoteEntry.js',
        // aboutApp: 'http://localhost:5005/assets/remoteEntry.js',
        blogApp: 'http://localhost:5006/assets/remoteEntry.js',
        contactApp: 'http://localhost:5007/assets/remoteEntry.js',
      },
      shared: ["react", "react-dom", "vue", "react-router-dom"],
      // shared: ["react", "react-dom", ],
      // react: {
      //   requiredVersion: "^19.0.0",
      // },
      // "react-dom": {
      //   requiredVersion: "^19.0.0",
      // },
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
    // cors: true,
    proxy: {
      // Add proxy for assets from remote application for assest
      '/assets': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
      // ,
      // '/home-assets': {
      //   target: 'http://localhost:5003',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/home-assets/, '/assets')
      // },
    },

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