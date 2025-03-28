import React from 'react'

import { Card, SpacePro } from '@/components'
import { ItemList } from '../ItemList'

import { type Habit } from '@/api/types'

interface ListProps {
  data?: Record<string, Habit.ItemRecord[]>
  onSuccess?: () => void
}

export const GroupList = (props: ListProps) => {
  const { data, onSuccess } = props

  return (
    <SpacePro direction='vertical'>
      {Object.entries(data || {})?.map(([key, list]) => (
        <Card key={key} size='small' title={key}>
          <ItemList list={list} onSuccess={onSuccess} />
        </Card>
      ))}
    </SpacePro>
  )
}
