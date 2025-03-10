import { useEffect, useState } from 'react'

// 判断某元素滚动时，指定元素是否显示
export const useElementScrollVisible = (scroll: any, target: any) => {
  const $scroll = document.querySelector(scroll) || {}
  const $scrollRect = $scroll.getBoundingClientRect()

  const [visible, setVisible] = useState(false)
  const [direction, setDirection] = useState('')
  const [rect, setRect] = useState('')

  useEffect(() => {

    const fn = () => {
      const $target = document.querySelector(target) || {}
      const rect = $target.getBoundingClientRect()
      setRect(rect)

      if (rect.bottom < $scrollRect.top) {
        setDirection('top')
        setVisible(false)

      } else if (rect.top > $scrollRect.bottom) {
        setDirection('bottom')
        setVisible(false)

      } else {
        setDirection('show')
        setVisible(true)
      }
    }

    fn()
    $scroll.addEventListener('scroll', fn)

    return () => $scroll.removeEventListener('scroll', fn)
  }, [])

  return {
    visible,
    direction,
    rect,
  }
}
