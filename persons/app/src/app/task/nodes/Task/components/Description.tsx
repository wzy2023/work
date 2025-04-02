import React from 'react'
import { Input } from '../../../components/Input'

interface DescriptionProps {
  description?: string
  isEdit: boolean
  onChange: (value?: any) => void
}

export const Description = (props: DescriptionProps) => {
  const { isEdit, description, onChange } = props

  if (!isEdit && !description) {
    return null
  }

  return (
    <div className='mt-2 text-xs text-gray-700 line-clamp-2'>
      <Input
        mode='textarea'
        isEdit={isEdit}
        value={description}
        onChange={description => onChange({ description })}
      />
    </div>
  )
}
