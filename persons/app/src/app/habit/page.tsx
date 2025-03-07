'use client'

import React from 'react'

import { Space } from 'antd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { Group } from './components/Group'
import { CreateButton } from './components/CreateButton'

import { api } from '@/api/react'

async function doAsyncJob() {
  const generalSettings = await Promise.resolve()
  const settings = await Promise.resolve()
  const config = await Promise.resolve()

  return [generalSettings, settings, config]
}

doAsyncJob()

export default () => {
  const utils = api.useUtils()

  const listState = api.habitGroup.list.useQuery()

  const deleteState = api.habitGroup.delete.useMutation({
    onSuccess: () => listState.refetch(),
  })

  const updateSortState = api.habitGroup.updateSort.useMutation({
    onSuccess: () => listState.refetch(),
  })

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newItemsOrder = Array.from(listState.data || [])
    const [removed] = newItemsOrder.splice(result.source.index, 1)
    newItemsOrder.splice(result.destination.index, 0, removed!)

    // 乐观更新
    utils.habitGroup.list.setData(undefined, newItemsOrder)

    updateSortState.mutate(newItemsOrder.map((item, index) => ({
      id: item.id,
      sort: index,
    })))
  }

  return (
    <div className='p-5 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-medium text-gray-900'>习惯管理</h1>
        <CreateButton onSuccess={listState.refetch} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='list' direction='vertical' isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Space direction='vertical' style={{ width: '100%' }}>
                {listState.data?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Group
                          item={item}
                          provided={provided}
                          onDelete={() => deleteState.mutate({ id: item.id })}
                        >
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
