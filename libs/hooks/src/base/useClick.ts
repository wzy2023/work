import React from 'react'

type MouseEventType = React.MouseEvent<HTMLElement> | MouseEvent;

type ClickHandler<P> = (event: P) => void;

interface Option<P> {
  onClick: ClickHandler<P>,
  onDoubleClick: ClickHandler<P>,
  delay?: number,
}

export const useClick = <P = MouseEventType>(option: Option<P>): ClickHandler<P> => {
  const { onClick, onDoubleClick, delay = 300 } = option

  const clickCount = React.useRef<number>(0)

  const timer = React.useRef<NodeJS.Timeout | null>(null)

  return (ev: P) => {
    clickCount.current += 1

    if (clickCount.current === 1) {
      timer.current = setTimeout(() => {
        if (clickCount.current === 1) {
          onClick(ev)
        }
        clickCount.current = 0
      }, delay)
    }

    if (clickCount.current === 2) {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      onDoubleClick(ev)
      clickCount.current = 0
    }
  }
}
