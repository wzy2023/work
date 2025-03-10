import { useEffect } from 'react'

// 进入时隐藏指定元素，销毁时恢复该元素
export const useHideFooter = (el = '.ant-layout-footer') => {
  useEffect(() => {
    const e: any = document.querySelector(el)
    e.style.display = 'none'
    return () => {
      e.style.display = 'block'
    }
  }, [])
}
