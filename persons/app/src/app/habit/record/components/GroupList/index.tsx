import React from 'react'

import { Card, SpacePro } from '@/components'
import { ItemList } from '../ItemList'

interface ListProps {
  data?: { group: Habit.Group, list: Habit.RunTime.ItemRecord[] }[]
  onSuccess?: (habit: Habit.Item) => void
}

export const GroupList = (props: ListProps) => {
  const { data, onSuccess } = props

  return (
    <SpacePro direction='vertical'>
      {data?.map(item => (
        <Card key={item.group.id} size='small' title={item.group.name}>
          <ItemList
            list={item.list}
            onSuccess={onSuccess}
          />
        </Card>
      ))}
    </SpacePro>
  )
}
