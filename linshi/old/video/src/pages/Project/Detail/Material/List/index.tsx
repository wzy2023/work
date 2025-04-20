import React from 'react'

import { Space } from '@/components'
import { Empty } from '../Empty'
import { ContextMenu } from '../ContextMenu'

import { useCurrents } from '../hooks'
import { nodeRenderMap } from '../../config'
import { MaterialType } from '../../../types'

interface ListProps {
  current: string
  index: number
}

export const List = (props: ListProps) => {
  const { current, index } = props

  const { currentData, changeCurrent } = useCurrents(index)

  const content = (
    <Space
      direction='vertical'
      style={{
        height: '85vh',
        overflow: 'auto',
        padding: 10,
        border: 'solid .5px #e0e0e0',
        borderRight: 'none',
      }}
    >
      {currentData?.map((item, idx: number) => {
        return (
          <ContextMenu key={item.id} data={item}>
            <div key={idx} onClick={() => changeCurrent(index, item)}>
              {React.createElement(nodeRenderMap[item.type], {
                data: item,
                active: current === item.id,
              })}
            </div>
          </ContextMenu>
        )
      })}
    </Space>
  )

  if (index !== 0) {
    return content
  }

  return (
    <ContextMenu data={{ type: MaterialType.EMPTY }}>
      {currentData?.length ? content : <Empty />}
    </ContextMenu>
  )
}
