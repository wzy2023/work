import { useDrag } from 'react-dnd'
import { DragOutlined } from '@wzyjs/component-web'

export const useDragCom = (data: any, useDragHandle = true) => {
  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: data.type,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  }))

  return {
    drag,
    preview,
    opacity,
    dragHandle: useDragHandle && (
      <DragOutlined ref={drag} style={{ cursor: 'move' }} />
    ),
  }
}
