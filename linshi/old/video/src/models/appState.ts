import { useEffect, useState } from 'react'

export default () => {
  const [collapsed, setCollapsed] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setCollapsed(true)
    }, 300)
  }, [])

  return {
    collapsed,
    setCollapsed,
  }
}
