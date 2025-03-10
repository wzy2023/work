import { DragSort, Dropdown, type DropResult } from '@/components'
import { Create } from './Create'
import { Delete } from './Delete'

import { useHovered } from '@/hooks'

import { api } from '@/api/react'
import { type HabitItem } from '@prisma/client'
import { useHabitItemCRUD } from '@/api/generated/store'

interface ListProps {
  groupId: number
}

export const List = (props: ListProps) => {
  const { groupId } = props

  const { isHovered, onMouseEnter, onMouseLeave } = useHovered()

  const { listState, apiUtils } = useHabitItemCRUD({
    list: {
      where: { groupId },
    },
  })

  const updateSort = api.habit.item.updateSort.useMutation({
    onSuccess: () => listState.refetch(),
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(listState.data || [])
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed!)

    apiUtils.habitItem.findMany.setData({ where: { groupId } }, newItems)

    updateSort.mutate(newItems.map((item, index) => ({
      id: item.id,
      sort: index + 1,
    })))
  }

  const menuItems = (item: HabitItem) => {
    return [
      {
        key: 'edit',
        label: (
          <Create
            id={item.id}
            groupId={groupId}
            initialValues={item}
            onSuccess={listState.refetch}
          />
        ),
      },
      {
        key: 'delete',
        danger: true,
        label: (
          <Delete
            id={item.id}
            onSuccess={listState.refetch}
          />
        ),
      },
    ]
  }

  return (
    <div style={{ width: '100%', padding: 10 }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DragSort<HabitItem>
        direction='horizontal'
        droppableId={`group-${groupId}`}
        list={listState.data}
        onDragEnd={onDragEnd}
        lastChildren={(
          <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Create groupId={groupId} onSuccess={listState.refetch} />
          </div>
        )}
      >
        {(item, provided) => (
          <Dropdown trigger={['contextMenu']} menu={{ items: menuItems(item) }}>
            <div
              {...provided.dragHandleProps}
              className='flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-grab shadow-md hover:shadow-lg'
            >
              {item.name}
            </div>
          </Dropdown>
        )}
      </DragSort>
    </div>
  )
}
