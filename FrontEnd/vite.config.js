import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression()
  ],
  server: {
    https: {
      key: '../cert/localhost-key.pem',
      cert: '../cert/localhost.pem'
    },
    port: 5173,
  },

  base: "/",
})
