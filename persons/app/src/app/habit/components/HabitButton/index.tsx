import { useEffect, useRef } from 'react'
import { Badge, ProgressButton } from '@/components'

import { formatTextWrap } from './utils'
import { habitFrequencyTypeMap, habitStatusColors } from '@/enums'
import { HabitFrequencyType, HabitProgressStatus } from '@/api/types'

interface HabitButtonProps {
  mode: Habit.StatusMode
  data: Habit.Item | Habit.RunTime.ItemRecord
}

export const HabitButton = (props: HabitButtonProps) => {
  const { data, mode } = props

  const prevStatusRef = useRef<HabitProgressStatus | null>(null)

  const item = data as Habit.RunTime.ItemRecord
  const progress = item?.record?.progress ?? 0

  const status = item?.status?.[mode] ??
    (item.enabled ? HabitProgressStatus.Enabled : HabitProgressStatus.Disabled) ??
    HabitProgressStatus.Pending

  useEffect(() => {
    prevStatusRef.current = status
  }, [status])

  const showAnimation = status === HabitProgressStatus.Done && prevStatusRef.current !== HabitProgressStatus.Done

  const type = data?.frequency!.type
  const text = habitFrequencyTypeMap[type]

  return (
    <Badge color='#f50' count={type !== HabitFrequencyType.DAILY ? text : ''} offset={[-8, 8]} style={{ zoom: 0.9 }}>
      <ProgressButton
        colors={habitStatusColors[status]}
        progress={item.record?.progress}
        showRing={progress > 0 && progress < 1}
        className={showAnimation ? 'animate-complete' : ''}
      >
        {formatTextWrap(item.name)}
      </ProgressButton>
    </Badge>
  )
}
