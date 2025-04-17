import { type Node } from '@xyflow/react'

import { LeftCircleOutlined } from '@/components'

import { useFlowState } from '../../hooks'
import { type NodeRecord } from '../../types'
import { Chain, getDescendantIds } from '../../utils'

interface HideChildrenProps {
  parentNode: NodeRecord
}

export const HideChildren = (props: HideChildrenProps) => {
  const { parentNode } = props

  const { nodes, edges, setNodes } = useFlowState()

  const childrenNum = getDescendantIds(parentNode as unknown as Node, edges).length

  const onClick = () => {
    parentNode.data.fold = !parentNode.data.fold

    setNodes(
      new Chain(nodes)
      .updateById(parentNode.id, parentNode as unknown as Node)
      .result(),
    )
  }

  return (
    <div onClick={onClick}>
      {parentNode.data.fold ? (
        <div
          style={{
            width: 15,
            height: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            color: `rgba(24, 144, 255, 1)`,
            backgroundColor: '#fff',
            border: '1.5px solid rgba(24, 144, 255, 1)',

            fontSize: 10,
            cursor: 'pointer',
            borderRadius: '50%',
          }}
        >
          {childrenNum}
        </div>
      ) : (
        <LeftCircleOutlined
          style={{
            color: `rgba(24, 144, 255, 1)`,
            fontSize: 14,
            backgroundColor: '#fff',
          }}
        />
      )}
    </div>
  )
}
