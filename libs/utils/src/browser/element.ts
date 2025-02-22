// 滚动到让指定元素显示出来的位置
export const scrollIntoView = (el: Element, option?: ScrollIntoViewOptions) => {
  if (!el) {
    return
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start', ...option })
}

// 获取指定元素 已经元素原始的样式
export const getElement = (el: string | Element) => {
  const element = typeof el === 'string' ? document.querySelector(el) : el
  if (!element) {
    return {
      element: null,
      originalStyle: {} as CSSStyleDeclaration,
    }
  }
  // 获取元素原始的样式
  return {
    element,
    originalStyle: window.getComputedStyle(element),
  }
}

// 判断元素是否在可见范围内
export const isElementInViewport = (el: string | Element) => {
  const { element } = getElement(el)
  if (!element) {
    return
  }
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
