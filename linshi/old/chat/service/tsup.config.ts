import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'ormconfig.js', 'src/entities/**/*.ts'],
  outDir: 'build',
  target: 'es2020',
  format: ['esm'],
  splitting: true,
  sourcemap: false,
  minify: false,
  shims: true,
  dts: false,
})
