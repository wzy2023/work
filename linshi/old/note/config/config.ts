import { defineConfig } from '@umijs/max'
import routes from './routes'

export default defineConfig({
  base: '/',
  publicPath: '/',
  hash: true,
  history: {
    type: 'hash',
  },
  favicons: ['/icon.webp'],
  antd: {},
  request: {},
  initialState: {},
  model: {},
  routes,
  access: {},
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  layout: {},
  fastRefresh: true,
  presets: ['umi-presets-pro'],
  mfsu: false,
  extraBabelPlugins: ['babel-plugin-dynamic-import-node'],
})
