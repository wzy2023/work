import { vite } from '@wzyjs/midway/exports'
import routes from './routes'

export default {
  antd: {},
  access: {},
  model: {},
  devtool: 'source-map',
  initialState: {},
  npmClient: 'yarn',
  outputPath: 'dist/_client',
  esbuildMinifyIIFE: true,
  routes,
  layout: {
    title: 'App',
  },
  vite: {
    plugins: [vite()],
    optimizeDeps: {
      exclude: ['@swc-node/register', '@swc/wasm', 'fsevents', 'unplugin'],
    },
  },
  proxy: {},
}
