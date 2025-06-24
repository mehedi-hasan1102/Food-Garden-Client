
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  css: {
    modules: {
      // Enable CSS modules if needed
      localsConvention: 'camelCase'
    }
  }
})