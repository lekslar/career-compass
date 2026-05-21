import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // Все запросы /api/* → Express на порт 3000
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  }
})
