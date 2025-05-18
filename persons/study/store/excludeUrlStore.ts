import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ExcludeUrlState {
  excludeUrls: string[] // 存储排除的URL列表
  addExcludeUrl: (url: string) => void // 添加排除URL
  removeExcludeUrl: (url: string) => void // 删除排除URL
  isUrlExcluded: (url: string) => boolean // 检查URL是否被排除
}

// 提取域名函数
const extractDomain = (url: string): string => {
  try {
    // 确保URL有协议前缀
    const urlWithProtocol = url.includes('://') ? url : `https://${url}`
    const urlObj = new URL(urlWithProtocol)
    return urlObj.hostname
  } catch (e) {
    // 如果解析失败，返回原始输入
    return url
  }
}

// 使用chrome.storage.sync而不是local以支持跨设备同步
const extensionStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (items) => {
        resolve(items[key] || null)
      })
    })
  },

  setItem: async (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve()
      })
    })
  },

  removeItem: async (key: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve()
      })
    })
  },
}

// 添加chrome类型声明
declare const chrome: {
  storage: {
    sync: {
      get: (key: string | string[] | object | null, callback: (result: any) => void) => void
      set: (items: Record<string, any>, callback?: () => void) => void
      remove: (key: string | string[], callback?: () => void) => void
    }
    local: {
      get: (key: string | string[] | null, callback: (result: any) => void) => void
      set: (items: Record<string, any>, callback?: () => void) => void
      remove: (key: string, callback?: () => void) => void
    }
  }
}

export const useExcludeUrlStore = create<ExcludeUrlState>()(
  persist(
    (set, get) => ({
      excludeUrls: [],

      addExcludeUrl: (url: string) => {
        // 提取域名
        const domain = extractDomain(url)

        const { excludeUrls } = get()

        // 确保域名不重复
        if (!excludeUrls.includes(domain)) {
          set({ excludeUrls: [...excludeUrls, domain] })

          // 通知内容脚本刷新
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('exclude-url-updated'))
          }
        }
      },

      removeExcludeUrl: (url: string) => {
        const { excludeUrls } = get()
        set({ excludeUrls: excludeUrls.filter(item => item !== url) })

        // 通知内容脚本刷新
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('exclude-url-updated'))
        }
      },

      isUrlExcluded: (url: string) => {
        const { excludeUrls } = get()

        try {
          // 提取当前URL的域名
          const domain = extractDomain(url)

          // 检查域名是否在排除列表中
          return excludeUrls.some(excludeDomain => domain === excludeDomain)
        } catch (e) {
          console.error('检查URL排除状态时出错:', e)
          return false
        }
      },
    }),
    {
      name: 'exclude-urls-v2', // 更改存储名称以避免冲突
      storage: createJSONStorage(() => extensionStorage),
    },
  ),
)
