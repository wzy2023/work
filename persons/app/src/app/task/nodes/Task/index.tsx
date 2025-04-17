import React, { useEffect } from 'react'
import type { Node } from '@xyflow/react'

import { ActionButtons, Dates, Description, Edit, ExecutionRecords, Tags, Title, PreTaskStatus } from './components'
import { Right, Border, Handle, Hover } from '../../components'

import { _ } from '@/utils'
import { useBoolean } from '@/hooks'
import type { NodeRecord, Task } from '../../types'
import { useFlowState, useTaskStatus } from '../../hooks'

import { useTaskStore } from '@/app/task/store'

export const TaskCard = (props: NodeRecord) => {
  const { selected, dragging, data } = props

  const {
    title,
    description,
    dates,
    tags,
    preTaskStatus,
    executionRecords = [],
  } = data as Task

  const { nodes, edges, setNodes } = useFlowState()

  const [isEditing, { setTrue, setFalse }] = useBoolean(false)

  const { setEditing } = useTaskStore()
  useEffect(() => {
    setEditing(isEditing)
  }, [isEditing, setEditing])

  const isDragging = nodes.some(item => item.dragging)
  useEffect(() => {
    if (isDragging) {
      setFalse()
    }
  }, [isDragging, setFalse])

  const { status, statusStyle } = useTaskStatus(props as unknown as Node, nodes, edges)

  const onChange = (value: any) => {
    setNodes(nodes => (
      nodes.map(node => (
        node.id === props.id
          ? { ...node, data: { ...node.data, ...value } }
          : node
      ))
    ))
  }

  const onDoubleClick = () => {
    if (data.result === undefined) {
      setTrue()
    }
  }

  return (
    <Handle>
      <Hover>
        {({ isHovered }) => (
          <Border selected={selected} isHovered={isHovered} style={statusStyle}>
            <Right
              parentNode={props}
              {...{ showAddBtn: false, isHovered, selected, dragging }}
            >
              <div className='w-[280px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='p-3' onDoubleClick={onDoubleClick}>
                {isEditing && (
                  <Edit onClick={setFalse} />
                )}

                <div className='flex justify-between items-center'>
                  <Title
                    title={title}
                    isEdit={isEditing}
                    onChange={onChange}
                  />

                  {!isEditing && (
                    <ActionButtons
                      status={status}
                      onChange={onChange}
                      executionRecords={_.cloneDeep(executionRecords)}
                    />
                  )}
                </div>

                <Dates
                  dates={dates}
                  isEdit={isEditing}
                  onChange={onChange}
                />

                <Description
                  description={description}
                  isEdit={isEditing}
                  onChange={onChange}
                />

                <ExecutionRecords
                  executionRecords={executionRecords}
                  isEdit={isEditing}
                />

                <Tags
                  tags={tags}
                  isEdit={isEditing}
                  onChange={onChange}
                />

                <PreTaskStatus
                  preTaskStatus={preTaskStatus}
                  isEdit={isEditing}
                  onChange={onChange}
                />
              </div>
            </div>
            </Right>
          </Border>
        )}
      </Hover>
    </Handle>
  )
}
