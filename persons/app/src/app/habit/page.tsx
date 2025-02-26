'use client'

import { api } from '@/trpc/react'
import { Group } from './components/Group'
import { useEffect, useState } from 'react'
import { Card, Space } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { DragOutlined } from '@ant-design/icons'

export default () => {
  // const listState = api.habitGroup.list.useQuery()

  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    setList([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ])
  }, [])

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newItemsOrder = Array.from(list)
    const [removed] = newItemsOrder.splice(result.source.index, 1)
    newItemsOrder.splice(result.destination.index, 0, removed!)

    setList([...newItemsOrder])
  }

  return (
    <div className='p-5'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='list' direction='vertical'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Space direction='vertical' style={{ width: '100%' }}>
                {list.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Group item={item} provided={provided}>
                          123
                        </Group>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Space>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
