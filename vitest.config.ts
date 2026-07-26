import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/__tests__/**/*.test.ts', 'src/**/__tests__/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@purdia/utils': fileURLToPath(new URL('./packages/utils/src/index.ts', import.meta.url)),
      '@purdia/crypto': fileURLToPath(new URL('./packages/crypto/src/index.ts', import.meta.url)),
      '@purdia/http': fileURLToPath(new URL('./packages/http/src/index.ts', import.meta.url)),
    },
  },
})
