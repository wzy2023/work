'use client'

import React from 'react'

import { DragDropContext, Draggable, Droppable, type OnDragEndResponder } from 'react-beautiful-dnd'
import { Space } from 'antd'

interface DragSortProps<T> {
  direction?: 'vertical' | 'horizontal'
  droppableId?: string
  list?: T[]
  children: (item: T, provided: any) => React.ReactNode
  lastChildren?: React.ReactNode
  onDragEnd: OnDragEndResponder
}

export { type DropResult } from 'react-beautiful-dnd'

export const DragSort = <T extends { id: number }>(props: DragSortProps<T>) => {
  const { direction = 'vertical', droppableId = 'list', list, children, lastChildren, onDragEnd } = props

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={droppableId}
        direction={direction}
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping
      >
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Space direction={direction} wrap style={{ width: '100%' }}>
              {list?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} >
                      {children(item, provided)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {lastChildren}
            </Space>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
