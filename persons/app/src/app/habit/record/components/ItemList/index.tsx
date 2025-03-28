import { useRef } from 'react'

import { type FormInstance, Modal, SpacePro } from '@/components'
import { HabitButton } from '../../../components/HabitButton'
import { Detail } from './Detail'

import { getNewExecItem } from '../../../const'
import { useHabitRecordStore } from '../../store'

import { useClick } from '@/hooks'
import { type Habit, HabitStatusMode } from '@/api/types'
import { useHabitRecordCRUD } from '@/api/generated/store'

interface ItemListProps {
  list: Habit.ItemRecord[]
  onSuccess?: () => void
}

export const ItemList = (props: ItemListProps) => {
  const { list, onSuccess } = props

  const detail = useRef<FormInstance>(null)

  const { selectedDate } = useHabitRecordStore()

  const { createState, updateState } = useHabitRecordCRUD({
    showTip: false,
    list: false,
    create: {
      onSuccess,
    },
    update: {
      onSuccess,
    },
  })

  const save = (habit: Habit.ItemRecord, values: Partial<Pick<Habit.Record, 'execList' | 'reason'>>) => {
    if (!values.execList) {
      return
    }

    if (!habit.record) {
      createState.mutate({
        habitId: habit.id,
        execList: values.execList,
        date: selectedDate.toDate(),
      })
      return
    }

    updateState.mutate(habit.record.id, {
      execList: values.execList,
      reason: values.reason,
    })
  }

  const onDoubleClick = (habit: Habit.ItemRecord) => {
    Modal.confirm({
      title: `习惯 [${habit.name}]`,
      width: 600,
      content: (
        <Detail ref={detail} data={habit} />
      ),
      onOk: async () => {
        await detail.current?.validateFields()
        const values: Habit.Record = detail.current?.getFieldsValue()
        save(habit, values)
      },
    })
  }

  const onClick = (habit: Habit.ItemRecord) => {
    if (Number(habit.record?.progress) >= 1) {
      return
    }

    const execList = habit.record?.execList || []
    execList.push(getNewExecItem(habit))
    save(habit, { execList })
  }

  const onClickAction = useClick<Habit.ItemRecord>({
    onClick,
    onDoubleClick,
  })

  return (
    <SpacePro>
      {list.sort((a: any, b: any) => a.sort - b.sort).map(item => (
        <div
          key={`${item.id}-${item.record?.id}`}
          onClick={() => onClickAction(item)}
        >
          <HabitButton data={item} mode={HabitStatusMode.Record} />
        </div>
      ))}
    </SpacePro>
  )
}
