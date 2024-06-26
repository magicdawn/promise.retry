import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    typecheck: {
      enabled: false,
    },
    coverage: {
      include: ['src'],
    },
  },
})
