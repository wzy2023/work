import React from 'react'
import { Select } from '@/components'

interface TagsProps {
  isEdit: boolean
  tags: string[]
  onChange: (value: any) => void
}

export const Tags = (props: TagsProps) => {
  const { isEdit, tags, onChange } = props

  if (!isEdit) {
    return null
  }

  return (
    <div className='mt-1.5 text-sm font-medium text-gray-900 truncate' style={{ width: '100%' }}>
      <Select
        mode='tags'
        style={{ width: '100%' }}
        placeholder='请选择标签'
        value={tags}
        onChange={tags => onChange({ tags })}
        options={['需求', 'BUG', '思考', '临时', '手机', '电脑', '外出', '家里'].map(value => ({
          label: value,
          value,
        }))}
      />
    </div>
  )
}
