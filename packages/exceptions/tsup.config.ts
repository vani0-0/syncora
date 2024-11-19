import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['lib/*.ts'],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  minify: true,
  sourcemap: true,
})
