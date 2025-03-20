import { DragSort, Dropdown, type DropResult } from '@/components'
import { Create } from './Create'
import { Delete } from './Delete'

import { useHovered } from '@/hooks'

import { api } from '@/api/react'
import { type HabitItem } from '@prisma/client'
import { useHabitItemCRUD } from '@/api/generated/store'

import styles from '../index.module.scss'

interface ListProps {
  groupId: number
}

export const List = (props: ListProps) => {
  const { groupId } = props

  const { isHovered, onMouseEnter, onMouseLeave } = useHovered()

  const { listState, apiUtils } = useHabitItemCRUD({
    list: {
      query: {
        where: { groupId },
        orderBy: { sort: 'asc' },
      },
    },
  })

  const updateSortState = api.custom.habitItem.updateSort.useMutation({
    onSuccess: () => listState.refetch(),
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(listState.data || [])
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed!)

    apiUtils.habitItem.findMany.setData({
      where: { groupId },
      orderBy: { sort: 'asc' },
    }, newItems)

    updateSortState.mutate(newItems.map((item, index) => ({
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
          <div className={styles.menu}>
            <Dropdown getPopupContainer={a => a} trigger={['contextMenu']} menu={{ items: menuItems(item) }}>
              <div
                {...provided.dragHandleProps}
                className={`flex items-center justify-center h-12 w-12 rounded-full text-white ${item.enable ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'} transition-colors cursor-grab shadow-md hover:shadow-lg`}
              >
                <span className='text-xs'>
                  {item.name}
                </span>
              </div>
            </Dropdown>
          </div>
        )}
      </DragSort>
    </div>
  )
}
