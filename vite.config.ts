import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window'
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      events: 'events',
      buffer: 'buffer',
      url: 'url',
      http: 'stream-http',
      util: 'util',
    }
  }
})
