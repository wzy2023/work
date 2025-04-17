import { type ChangeEvent, type KeyboardEvent, useEffect, useMemo, useState } from 'react'
import type { Node } from '@xyflow/react'

import { Input } from '@/components'
import { Border, Handle, Hover, Right } from '../../components'

import { useFlowState } from '../../hooks'
import type { NodeRecord } from '../../types'
import { getDescendantNodes } from '../../utils'

import { useTaskStore } from '@/app/task/store'

export const Group = (props: NodeRecord) => {
  const { selected, dragging, data } = props

  const { setEditing } = useTaskStore()

  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    setEditing(isEditing)
  }, [isEditing, setEditing])

  useEffect(() => {
    if (data.editing) {
      delete data.editing
      setIsEditing(true)
      setTimeout(() => document.querySelector('input')?.focus(), 300)
    }
  }, [data, setIsEditing])

  const [inputValue, setInputValue] = useState(props?.data.title || '')

  const { nodes, edges, setNodes } = useFlowState()

  const showAddBtn = useMemo(() => {
    const descendantNodes = getDescendantNodes(props as unknown as Node, nodes, edges)
    return !descendantNodes.length ? undefined : descendantNodes[0]?.type === 'group'
  }, [edges, nodes, props])

  const onDoubleClick = () => {
    setIsEditing(true)
    setInputValue(props?.data.title || '')
  }

  const onInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value || '')
  }

  const handleSave = () => {
    setIsEditing(false)
    setNodes(nodes => (
      nodes.map(node => (
        node.id === props.id
          ? { ...node, data: { ...node.data, title: inputValue } }
          : node
      ))
    ))
  }

  const onBlur = () => {
    handleSave()
  }

  const onKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      if (isEditing) {
        handleSave()
      }
    }
  }

  return (
    <Handle>
      <Hover>
        {({ isHovered }) => (
          <Border selected={selected} isHovered={isHovered}>
            <Right
              parentNode={props}
              {...{ showAddBtn, isHovered, selected, dragging }}
            >
              <div style={{ backgroundColor: 'rgb(249, 250, 251)' }}>
                {isEditing ? (
                  <div style={{ padding: 5 }} onDragOver={(e) => e.preventDefault()}>
                    <Input
                      autoFocus
                      bordered={false}
                      value={inputValue}
                      onChange={onInput}
                      onBlur={onBlur}
                      onKeyDown={onKeyDown}
                    />
                  </div>
                ) : (
                  <div
                    onDoubleClick={onDoubleClick}
                    style={{
                      padding: '5px 10px',
                      color: !props?.data.title ? '#ddd' : '',
                    }}
                  >
                    {props?.data.title || '双击编辑'}
                  </div>
                )}
              </div>
            </Right>
          </Border>
        )}
      </Hover>
    </Handle>
  )
}
