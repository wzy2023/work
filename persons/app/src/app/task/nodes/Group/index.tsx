import { type ChangeEvent, type KeyboardEvent, useMemo, useState } from 'react'
import type { Node } from '@xyflow/react'

import { Input } from '@/components'
import { Add } from '../Base/Add'
import { Hover } from '../Base/Hover'
import { Handle } from '../Base/Handle'
import { Border } from '../Base/Border'

import { useFlowState } from '../../hooks'
import type { NodeRecord } from '../../types'
import { getDescendantNodes } from '../../utils'

export const Group = (props: NodeRecord) => {
  const { selected, dragging } = props

  const [isEditing, setIsEditing] = useState(false)
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
      } else {
        console.log(666, 56, '1', 1)
      }
    }
  }

  return (
    <Handle>
      <Hover>
        {({ isHovered }) => (
          <Border selected={selected} isHovered={isHovered}>
            <Add
              parentNode={props}
              {...{ showAddBtn, isHovered, selected, dragging }}
            >

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
            </Add>
          </Border>
        )}
      </Hover>
    </Handle>
  )
}
