import { DragSort, Dropdown, type DropResult } from '@/components'
import { HabitButton } from '../../../components/HabitButton'
import { Create } from './Create'
import { Delete } from './Delete'

import { useHovered } from '@/hooks'
import { type Habit, HabitStatusMode } from '@/api/types'

import styles from '../index.module.scss'

interface ListProps {
  groupId: number
  data: Habit.Item[]
  onDragEnd: (dropResult: DropResult) => void
  onSuccess: () => void
}

export const List = (props: ListProps) => {
  const { data, groupId, onDragEnd, onSuccess } = props

  const { isHovered, onMouseEnter, onMouseLeave } = useHovered()

  const menuItems = (item: Habit.Item) => {
    return [
      {
        key: 'edit',
        label: (
          <Create
            id={item.id}
            groupId={groupId}
            initialValues={item}
            onSuccess={onSuccess}
          />
        ),
      },
      {
        key: 'delete',
        danger: true,
        label: (
          <Delete
            id={item.id}
            onSuccess={onSuccess}
          />
        ),
      },
    ]
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DragSort<Habit.Item>
        direction='horizontal'
        droppableId={`group-${groupId}`}
        list={data}
        onDragEnd={onDragEnd}
        lastChildren={(
          <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Create groupId={groupId} onSuccess={onSuccess} />
          </div>
        )}
      >
        {(item, provided) => (
          <div className={styles.menu}>
            <Dropdown getPopupContainer={a => a} trigger={['contextMenu']} menu={{ items: menuItems(item) }}>
              <div {...provided.dragHandleProps}>
                <HabitButton data={item} mode={HabitStatusMode.Habit} />
              </div>
            </Dropdown>
          </div>
        )}
      </DragSort>
    </div>
  )
}
