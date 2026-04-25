import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Force one chunk per pillar seed so each can load independently and
        // cache independently. The seed-hydrator dynamic-imports these only
        // when the matching pillar surface is visited.
        manualChunks(id) {
          if (id.includes('/seed-tasks/faith-seed-tasks'))       return 'seed-faith';
          if (id.includes('/seed-tasks/life-seed-tasks'))        return 'seed-life';
          if (id.includes('/seed-tasks/intellect-seed-tasks'))   return 'seed-intellect';
          if (id.includes('/seed-tasks/family-seed-tasks'))      return 'seed-family';
          if (id.includes('/seed-tasks/wealth-seed-tasks'))      return 'seed-wealth';
          if (id.includes('/seed-tasks/environment-seed-tasks')) return 'seed-environment';
          if (id.includes('/seed-tasks/ummah-seed-tasks'))       return 'seed-ummah';
          if (id.includes('/seed-tasks/prayer-seed-tasks'))      return 'seed-prayer';
          if (id.includes('/seed-tasks/weekly-seed-tasks'))      return 'seed-weekly';
        },
      },
    },
  },
})
