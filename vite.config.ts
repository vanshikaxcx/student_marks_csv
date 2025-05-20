import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // must be '/' for Vercel
  plugins: [react()],
})
