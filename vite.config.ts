import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const filesToExclude = ["src/__test__/"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
      events: "events",
      buffer: "buffer",
      url: "url",
      http: "stream-http",
      util: "util",
    },
  },
  build: {
    rollupOptions: {
      external: [
        "stream",
        "events",
        "buffer",
        "url",
        "http",
        "util",
        ...filesToExclude,
      ],
    },
  },
});
