import { defineConfig } from 'vite'
import hooks from '@midwayjs/vite-plugin-hooks'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

export default defineConfig({
  plugins: [hooks(), reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
