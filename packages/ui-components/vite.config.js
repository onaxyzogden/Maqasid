import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'OgdenUIComponents',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', 'zustand', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          zustand: 'create',
          'lucide-react': 'lucideReact'
        }
      }
    }
  }
})
