import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      assets: path.resolve(__dirname, "./src/assets"),
      layout: path.resolve(__dirname, "./src/layout"),
      utils: path.resolve(__dirname, "./src/utils"),
      styles: path.resolve(__dirname, "./src/assets/styles"),
      images: path.resolve(__dirname, "./src/assets/images"),
      svg: path.resolve(__dirname, "./src/assets/svg"),
      api: path.resolve(__dirname, "./src/api"),
      routes: path.resolve(__dirname, "./src/routes"),
      data: path.resolve(__dirname, "./src/data"),
      hooks: path.resolve(__dirname, "./src/utils/hooks"),
      contexts: path.resolve(__dirname, "./src/contexts"),
    },
  },
})
