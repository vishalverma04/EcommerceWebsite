import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'https://ecommercewebsite-1-9ysd.onrender.com',
        changeOrigin:true,
        secure:false
      }
    }
  }
})
