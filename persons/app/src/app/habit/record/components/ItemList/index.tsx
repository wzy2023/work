import { useRef } from 'react'

import { type FormInstance, Modal, SpacePro } from '@/components'
import { HabitButton } from '../../../components/HabitButton'
import { Detail } from './Detail'

import { getNewExecItem } from '../../../utils'
import { useHabitRecordStore } from '../../store'

import { useClick } from '@/hooks'
import { useHabitRecordCRUD } from '@/api/generated/crud'
import { HabitStatusMode } from '@/api/types'

interface ItemListProps {
  list: Habit.RunTime.ItemRecord[]
  onSuccess?: (habit: Habit.Item) => void
}

export const ItemList = (props: ItemListProps) => {
  const { list, onSuccess } = props

  const detail = useRef<FormInstance>(null)

  const { selectedDate } = useHabitRecordStore()

  const { createState, updateState } = useHabitRecordCRUD({
    showTip: false,
    list: false,
  })

  const save = async (habit: Habit.RunTime.ItemRecord, values: Partial<Pick<Habit.Record, 'execList' | 'reason'>>) => {
    if (!values.execList) {
      return
    }

    if (!habit.record) {
      await createState.mutateAsync({
        habitId: habit.id,
        execList: values.execList,
        date: selectedDate.toDate(),
      })
      onSuccess?.(habit)
      return
    }

    await updateState.mutateAsync(habit.record.id, {
      execList: values.execList,
      reason: values.reason,
    })
    onSuccess?.(habit)
  }

  const onDoubleClick = (habit: Habit.RunTime.ItemRecord) => {
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

  const onClick = (habit: Habit.RunTime.ItemRecord) => {
    if (Number(habit.record?.progress) >= 1) {
      return
    }

    const execList = habit.record?.execList || []
    execList.push(getNewExecItem(habit))
    save(habit, { execList })
  }

  const onClickAction = useClick<Habit.RunTime.ItemRecord>({
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
