import { useEffect, useState } from 'react'
import { history } from '@umijs/max'
import { transform } from './utils'
import { flashBackground, scrollIntoView } from '@/utils'

export interface AnchorItem {
  name: string,
  parent?: string,
  children?: AnchorItem[],
}

export default () => {
  const [data, setData] = useState<AnchorItem[]>([])
  const [active, setActive] = useState<string>('')

  // active改变时，定位到该Card
  useEffect(() => {
    if (!active) {
      return
    }
    setTimeout(() => {
      const el = document.querySelector(`[id="${encodeURIComponent(active)}"]`)
      if (!el) {
        return
      }
      scrollIntoView(el)
      flashBackground(el, '#1890ff', 0.5)
    }, 100)
  }, [active])

  useEffect(() => {
    setActive(decodeURIComponent(history.location.hash).replace('#', ''))
  }, [])

  // 监听到页面改变时，清空anchorData
  useEffect(() => {
    history.listen(({ action, location: { hash } }) => {
      if (action === 'PUSH') {
        setActive('')
        setData([])
      }
      if (action === 'POP') {
        setActive(decodeURIComponent(hash).replace('#', ''))
      }
    })
  }, [])

  const push = (item: AnchorItem) => {
    if (data.find((i) => i.name === item.name)) {
      return
    }
    setData(data => Array.from(new Set([...data, item])))
  }

  return {
    data,
    push,
    setData,
    active,
    menuData: transform(data),
  }
}
