import { defineConfig } from '@midwayjs/hooks'

export default defineConfig({
  source: './src/apis',
  routes: [
    {
      baseDir: 'api',
      basePath: '/api',
    },
  ],
})
