import { useState } from 'react'

export enum Dir {
  Prev = 'Prev',
  Next = 'Next'
}

interface Option {
  defaultCurrent?: number
  onChangeCheck?: (current: number, dir: Dir) => false | void // 步骤切换前的检查，返回 false，则取消切换
  onChangeBefore?: () => void; // 步骤切换前触发
  onChangeAfter?: () => void; // 步骤切换后触发
}

export const useStep = (option: Option) => {
  const { defaultCurrent = 0, onChangeCheck, onChangeBefore, onChangeAfter } = option

  const [current, setCurrent] = useState<number>(defaultCurrent)

  const onPrev = () => {
    if (onChangeCheck?.(current, Dir.Prev) === false) {
      return
    }
    onChangeBefore?.()
    setCurrent(current - 1)
    onChangeAfter?.()
  }

  const onNext = () => {
    if (onChangeCheck?.(current, Dir.Next) === false) {
      return
    }
    onChangeBefore?.()
    setCurrent(current + 1)
    onChangeAfter?.()
  }

  return {
    current,
    onPrev,
    onNext,
  }
}
