import React from 'react'
import { Card, Checkbox, Space } from 'antd'

interface FilterTagsProps {
  tags: string[]
  value: string[]
  onChange: (tags: string[]) => void
}

export const FilterTags: React.FC<FilterTagsProps> = ({ tags, value, onChange }) => {
  if (tags.length === 0) {
    return null
  }

  return (
    <Card size='small' style={{ marginBottom: 16 }}>
      <Checkbox.Group value={value} onChange={onChange}>
        <Space wrap>
          {tags.map(tag => (
            <Checkbox key={tag} value={tag}>
              {tag}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Card>
  )
}
