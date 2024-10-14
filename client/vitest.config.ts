import { fileURLToPath } from 'node:url';
import {
  mergeConfig,
  defineConfig,
  configDefaults
} from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      css: true,
      setupFiles: './src/components/__tests__/setup.ts',
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul', // or 'v8'
        reporter: ['text', 'html'],
        reportsDirectory: './src/components/__tests__/coverage'
      }
    }
  })
);
