import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: '网页内容查看器',
    description: '在网页右下角添加一个按钮，点击后右侧弹出抽屉显示网页内容',
    permissions: ['activeTab', 'storage'],
    action: {
      default_title: '网页内容查看器',
      default_popup: 'popup.html',
    },
  },
  webExt: {
    disabled: true,
  },
})
