import { type ReactNode } from 'react'
import { Handle as Handle_, Position } from '@xyflow/react'

interface BaseProps {
  children: ReactNode
}

export const Handle = (props: BaseProps) => {
  const { children } = props

  return (
    <div>
      {children}

      <Handle_
        type='source'
        position={Position.Right}
        style={{ visibility: 'hidden' }}
      />

      <Handle_
        type='target'
        position={Position.Left}
        style={{ visibility: 'hidden' }}
      />
    </div>
  )
}
