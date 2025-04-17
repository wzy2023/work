'use client'

import React from 'react'

import { Space } from 'antd'
import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
  type DraggableProvided,
} from 'react-beautiful-dnd'

interface DragSortProps<T> {
  direction?: 'vertical' | 'horizontal'
  droppableId?: string
  list?: T[]
  children: (item: T, provided: DraggableProvided) => React.ReactNode
  lastChildren?: React.ReactNode
  onDragEnd?: OnDragEndResponder
  hasContext?: boolean
  dropType?: string
}

export { type DropResult, type DraggableProvided } from 'react-beautiful-dnd'

export const DragSort = <T extends { id: string }>(props: DragSortProps<T>) => {
  const {
    dropType,
    direction = 'vertical',
    droppableId = 'list',
    list,
    children,
    hasContext = true,
    lastChildren,
    onDragEnd,
  } = props

  const content = (
    <Droppable
      type={dropType}
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
  )

  if (!hasContext) {
    return content
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {content}
    </DragDropContext>
  )
}
