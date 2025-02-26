import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://www.bortakvall.se', // Backend API URL
                changeOrigin: true, // Needed for virtual hosted sites
                rewrite: (path) => path.replace(/^\/api/, '') // Removes /api from the URL
            }
        }
    }
})
