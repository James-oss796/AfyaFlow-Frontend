import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    proxy: {
      // Backend endpoints (Spring Boot runs on 8080)
      '/auth': 'http://localhost:8080',
      '/patients': 'http://localhost:8080',
      '/doctors': 'http://localhost:8080',
      '/departments': 'http://localhost:8080',
      '/appointments': 'http://localhost:8080',
      '/queue': 'http://localhost:8080',
      '/admin': 'http://localhost:8080',
      '/appointments/available-slots': 'http://localhost:8080',
      '/logs': 'http://localhost:8080',
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
