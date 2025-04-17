import React from 'react'

import { Input } from '../../../components/Input'

interface TitleProps {
  title: string
  isEdit: boolean
  onChange: (value: any) => void
}

export const Title = (props: TitleProps) => {
  const { isEdit, title, onChange } = props

  return (
    <div className='text-sm font-medium text-gray-900 truncate w-full'>
      <div style={{ color: !title ? '#ccc' : '' }}>
        <Input
          isEdit={isEdit}
          value={title}
          autoFocus
          onChange={title => onChange({ title })}
        />
      </div>
    </div>
  )
}
