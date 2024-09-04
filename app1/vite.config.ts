import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx", // Expose toàn bộ ứng dụng React
      },
      // exposes: {
      //   "./web-components": "./src/index.tsx",
      // },
      shared: ["react", "react-dom"], // cái này khi nào đóng vào web components thì bỏ vì tất cả đều là web compoennts hết
    }),
  ],

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  publicDir: "src/build/Build", // Đảm bảo rằng thư mục build của Unity được phục vụ công khai
});
