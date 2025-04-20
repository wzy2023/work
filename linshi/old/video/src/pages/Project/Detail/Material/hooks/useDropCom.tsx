import { useModel } from '@umijs/max'
import { useDrop } from 'react-dnd'

export const useDropCom = (data: any) => {
  const { materialUpdateState, materialListState } = useModel('Project.Detail.Material.model')

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ['text', 'group'],
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    drop: async (item: any) => {
      if (!item?.id || !data?.id || item.id === data.id) {
        return
      }
      await materialUpdateState.runAsync(item.id, {
        parent: data.id,
      })
      materialListState.refresh()
    },
  }))

  return {
    drop,
    isOver,
    canDrop,
  }
}
