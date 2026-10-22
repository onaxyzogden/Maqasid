import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildSwitches } from './build-switches.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Both switches off in tests, whatever .env.local says; tests inject a client instead.
  define: buildSwitches({}),
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
  test: {
    include: ['src/**/__tests__/**/*.test.{js,jsx}', 'src/**/*.test.{js,jsx}'],
    environment: 'node',
  },
});
