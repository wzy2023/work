'use client'

import { Space } from 'antd'
import { Group } from './components/Group'
import { CreateButton } from './components/CreateButton'

import { api } from '@/trpc/react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default () => {
  const listState = api.habitGroup.list.useQuery()

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    // const newItemsOrder = Array.from(list)
    // const [removed] = newItemsOrder.splice(result.source.index, 1)
    // newItemsOrder.splice(result.destination.index, 0, removed!)
    //
    // setList([...newItemsOrder])
  }

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>习惯管理</h1>
        <CreateButton onSuccess={listState.refetch} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='list' direction='vertical'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Space direction='vertical' style={{ width: '100%' }}>
                {listState.data?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Group item={item} provided={provided}>
                          <span></span>
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
