import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '../components/App'
import { useExcludeUrlStore } from '@/store'

// 添加chrome类型声明
declare const chrome: {
  runtime: {
    onMessage: {
      addListener: (callback: (message: { action: string }, sender: any, sendResponse: any) => void) => void
    }
  },
  storage: {
    local: {
      get: (key: string | string[] | null, callback: (result: any) => void) => void
    },
    sync: {
      get: (key: string | string[] | null, callback: (result: any) => void) => void
    }
  }
}

// 全局变量跟踪DOM元素
let containerElement: HTMLDivElement | null = null
let rootInstance: ReturnType<typeof createRoot> | null = null

// 移除所有插入的DOM元素
const removeAllElements = () => {
  if (rootInstance) {
    try {
      rootInstance.unmount()
    } catch (e) {
      console.error('卸载组件时出错:', e)
    }
    rootInstance = null
  }

  if (containerElement && containerElement.parentNode) {
    containerElement.parentNode.removeChild(containerElement)
    containerElement = null
  }
}

// 初始化存储并执行内容脚本的主逻辑
const initializeAndRun = async () => {
  // 获取当前页面URL
  const currentUrl = window.location.href

  try {
    // 预先访问一次store，确保它已初始化
    const isExcluded = useExcludeUrlStore.getState().isUrlExcluded(currentUrl)

    // 如果URL在排除列表中，则不显示按钮
    if (isExcluded) {
      console.log('当前URL已被排除，不显示按钮')
      removeAllElements() // 确保移除任何已存在的元素
      return
    }

    console.log('创建内容查看器按钮')

    // 如果已经存在，先移除
    if (containerElement) {
      removeAllElements()
    }

    // 创建一个容器元素
    containerElement = document.createElement('div')
    containerElement.id = 'web-content-drawer-root'
    document.body.appendChild(containerElement)

    // 渲染React组件
    rootInstance = createRoot(containerElement)
    const appInstance = <App />
    rootInstance.render(appInstance)

    // 监听来自popup的消息
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'showDrawer') {
        // 通过全局事件触发抽屉显示
        const event = new CustomEvent('showContentDrawer')
        window.dispatchEvent(event)
      }
    })

    // 监听排除URL更新事件
    window.addEventListener('exclude-url-updated', () => {
      console.log('排除URL已更新，重新检查当前页面')
      // 重新检查当前页面是否应该被排除
      const shouldBeExcluded = useExcludeUrlStore.getState().isUrlExcluded(window.location.href)
      if (shouldBeExcluded) {
        console.log('当前页面已被添加到排除列表，移除按钮')
        removeAllElements()
      }
    })
  } catch (error) {
    console.error('初始化内容脚本时出错:', error)
  }
}

export default defineContentScript({
  matches: ['<all_urls>'], // 匹配所有网址
  main() {
    setTimeout(initializeAndRun, 100)
  },
})
