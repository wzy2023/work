import { useBoolean } from 'ahooks'

export const useHovered = () => {
  const [isHovered, { setTrue, setFalse }] = useBoolean(false)

  const hoverProps = {
    onMouseEnter: setTrue,
    onMouseLeave: setFalse,
  }

  return {
    isHovered,
    hoverProps,
    ...hoverProps,
  }
}
