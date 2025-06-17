import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // On redirige toutes les requêtes qui commencent par /api
      // vers notre serveur backend sur le port 5000.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Nécessaire pour les hôtes virtuels
        secure: false,      // Pas de vérification SSL en local
      }
    }
  }
})