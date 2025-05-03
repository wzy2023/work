'use client'

import React from 'react'
import { Switch } from '@/components'

interface FeedStatusSwitchProps {
  record: any
  onChange: (checked: boolean, id: string) => Promise<void>
}

export const FeedStatusSwitch: React.FC<FeedStatusSwitchProps> = ({ record, onChange }) => {
  return (
    <Switch
      checked={record.enabled}
      onChange={(checked) => onChange(checked, record.id)}
    />
  )
}
