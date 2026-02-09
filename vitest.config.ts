import angular from '@analogjs/vite-plugin-angular';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: path.resolve(__dirname, 'tsconfig.spec.json'),
    }),
  ],
  test: {
    globals: true,

    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
        pretendToBeVisual: true,
        resources: 'usable',
      },
    },

    setupFiles: ['test-setup.ts'],

    include: ['**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/.cache/**', '**/bazel-out/**'],

    mockReset: false,
    restoreMocks: false,

    testTimeout: 10000, // 10 seconds
    hookTimeout: 10000, // 10 seconds
  },
});
