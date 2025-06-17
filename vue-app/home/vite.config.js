// remote-vue\vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [
    vue(),
    federation({
      // nama aplikasi vue
      name: "homeApp",
      filename: "remoteEntry.js",
      // component yang bisa diakses oleh aplikasi host
      exposes: {
        // "./HelloWorld": "./src/components/HelloWorld.vue",
        "./App": "./src/App.vue",
      },
      // depedensi bersama supaya tidak duplikat
      shared: {
        vue: { requiredVersion: "^3.0.0" }, 
      },
      useImportStyle: true, 
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5003,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  preview: {
    port: 5003,
  },
build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
    assetsDir: 'assets',
  },
});
