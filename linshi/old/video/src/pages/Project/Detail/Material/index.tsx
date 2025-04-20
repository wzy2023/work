import React from 'react'
import { useModel } from '@umijs/max'

import { Space, Spin, Radio } from '@/components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { List } from './List'
import { useCurrents } from './hooks'
import { filterOptions } from '../../types'

export default () => {
  const { currents } = useCurrents()
  const { materialListState, filter, setFilter } = useModel('Project.Detail.Material.model')

  return (
    <DndProvider backend={HTML5Backend}>
      <Radio.Group
        optionType='button'
        style={{ marginBottom: 8 }}
        value={filter}
        onChange={e => setFilter(e.target.value)}
        options={filterOptions}
      />

      <Spin spinning={materialListState.loading}>
        <Space size={0} style={{ borderRight: 'solid .5px #e0e0e0' }}>
          {[...currents, ''].map((current: string, index: number) => (
            <List
              key={index}
              current={current}
              index={index}
            />
          ))}
        </Space>
      </Spin>
    </DndProvider>
  )
}
