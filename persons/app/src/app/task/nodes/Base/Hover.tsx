import type { ReactNode } from 'react'
import { useHovered } from '@/hooks'

interface HoverProps {
  children: (params: { isHovered: boolean }) => ReactNode
}

export const Hover = (props: HoverProps) => {
  const { children } = props

  const { isHovered, hoverProps } = useHovered()

  return (
    <div {...hoverProps}>
      {children({ isHovered })}
    </div>
  )
}
