import { DragSort, Dropdown } from '@/components'
import { HabitButton } from '../../../components/HabitButton'
import { Create } from './Create'
import { Delete } from './Delete'

import { useHovered } from '@/hooks'
import { type Habit, HabitStatusMode } from '@/api/types'

import styles from '../index.module.scss'

interface ListProps {
  groupId: string
  data?: Habit.Item[]
  onSuccess?: () => void
}

export const List = (props: ListProps) => {
  const { data, groupId, onSuccess } = props

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
        list={data?.sort((a, b) => (a.sort || 0) - (b.sort || 0)) || []}
        hasContext={false}
        dropType='habit'
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
