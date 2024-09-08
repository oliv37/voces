import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        "build-routes": path.resolve(__dirname, "src/build-routes.ts"),
      },
    },
    ssr: true,
    outDir: path.resolve(__dirname, "dist"),
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "../src/data"),
      "@features": path.resolve(__dirname, "../src/app/features"),
      "@shared": path.resolve(__dirname, "../src/app/shared"),
    },
  },
});
