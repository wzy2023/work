import { useBoolean } from 'ahooks'

export const useHovered = () => {
  const [isHovered, { setTrue, setFalse }] = useBoolean(false)

  return {
    isHovered,
    onMouseEnter: setTrue,
    onMouseLeave: setFalse,
  }
}
