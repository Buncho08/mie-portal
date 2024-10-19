import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    entry:'../backend/templates/mie',
    outDir: '../backend/static',
    name:'index',
    filename: 'index'
  }
})
