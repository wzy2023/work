import React from 'react'
import { Card, DragOutlined, TextInput } from '@/components'
import { ButtonList } from '../ButtonList'
import { useHovered } from '@/hooks'

interface CardGroupProps {
  item: CommonGroupLayout.Item
  onChangeName: (id: string, name: string) => void
}

export const CardGroup = (props: CardGroupProps) => {
  const { item, onChangeName } = props

  const { isHovered, hoverProps } = useHovered()

  return (
    <Card
      {...hoverProps}
      size='small'
      style={{ width: '100%', height: '100%' }}
      bodyStyle={{ height: '80%' }}
      title={(
        <TextInput
          value={item.data.title}
          onChange={name => onChangeName(item.i, name)}
        />
      )}
      extra={isHovered && (
        <DragOutlined className='drag-handle cursor-grab' />
      )}
    >
      <ButtonList item={item} />
    </Card>
  )
}
