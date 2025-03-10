import { useState } from 'react'

// visible和info的集合体
export const useVisibleInfo = (v = false, i: any) => {
  const [visible, setVisible] = useState(v)
  const [info, setInfo] = useState(i)
  return [
    visible,
    {
      setTrue: () => setVisible(true),
      setFalse: () => setVisible(false),
      toggle: () => setVisible(!visible),
    },
    [
      info,
      setInfo,
    ],
  ]
}
