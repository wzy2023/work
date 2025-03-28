import { useEffect, useRef } from 'react'
import { Badge, ProgressButton } from '@/components'

import { formatTextWrap } from '../../utils'
import { type Habit, HabitFrequencyType, HabitProgressStatus, type HabitStatusMode } from '@/api/types'

const statusColors = {
  [HabitProgressStatus.Enabled]: { bg: 'bg-blue-500 hover:bg-blue-600', ring: '' },
  [HabitProgressStatus.Disabled]: { bg: 'bg-gray-400 hover:bg-gray-500', ring: '' },
  [HabitProgressStatus.Pending]: { bg: 'bg-gray-300 hover:bg-gray-400', ring: '' },
  [HabitProgressStatus.Done]: { bg: 'bg-green-500 hover:bg-green-600', ring: '' },
  [HabitProgressStatus.Doing]: { bg: 'bg-yellow-500 hover:bg-yellow-600', ring: 'text-yellow-300' },
  [HabitProgressStatus.Faild]: { bg: 'text-red-300 hover:bg-red-600', ring: 'bg-red-500' },
}

interface HabitButtonProps {
  mode: HabitStatusMode
  data: Habit.Item | Habit.ItemRecord
}

const map = {
  [HabitFrequencyType.DAILY]: undefined,
  [HabitFrequencyType.WEEKLY]: '周',
  [HabitFrequencyType.MONTHLY]: '月',
}

export const HabitButton = (props: HabitButtonProps) => {
  const { data, mode } = props

  const prevStatusRef = useRef<HabitProgressStatus | null>(null)

  const item = data as Habit.ItemRecord
  const progress = item?.record?.progress ?? 0

  const status = item?.status?.[mode] ??
    (item.enable ? HabitProgressStatus.Enabled : HabitProgressStatus.Disabled) ??
    HabitProgressStatus.Pending

  useEffect(() => {
    prevStatusRef.current = status
  }, [status])

  const showAnimation = status === HabitProgressStatus.Done && prevStatusRef.current !== HabitProgressStatus.Done

  // @ts-ignore
  const tag = map[(data?.frequency)?.type]

  return (
    <Badge color='#f50' count={tag} offset={[-8, 8]}>
      <ProgressButton
        colors={statusColors[status]}
        progress={item.record?.progress}
        showRing={progress > 0 && progress < 1}
        className={showAnimation ? 'animate-complete' : ''}
      >
        {formatTextWrap(item.name)}
      </ProgressButton>
    </Badge>
  )
}
