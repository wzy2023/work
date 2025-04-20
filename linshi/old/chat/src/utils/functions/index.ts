import { addPoint } from '@/api'
import { useUserStore } from '@/store'

export function getCurrentDate() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export function trackEvent(pointType: 'click' | 'view', pointName: string, extraData?: any) {
  if (process.env.NODE_ENV === 'development' || useUserStore().userInfo?.role === 2) {
    return
  }
  addPoint({
    pointType,
    pointName,
    extraData,
    userAgent: navigator.userAgent,
    pageUrl: window.location.hash
  })
}

export const getOptions = (options: (string | { label: string, value: string })[]): {
  label: string,
  value: string
}[] => {
  return options.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item,
        value: item,
      }
    }
    return item
  })
}
