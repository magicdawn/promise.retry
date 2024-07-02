import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    target: 'node16',
    clean: true,
    dts: true,
    esbuildOptions(options, context) {
      options.charset = 'utf8'
    },
  }
})
