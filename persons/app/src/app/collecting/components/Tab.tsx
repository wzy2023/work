import React from 'react'

import { Spin } from '@/components'
import { FilterTags } from './FilterTags'
import { FilterList } from './FilterList'
import { CreateUpdate } from './CreateUpdate'

import { useCollectingData, useFilterTags } from '../hooks'
import { type CollectingType } from '@/api/types'

interface TabProps {
  type: CollectingType
}

export const Tab = ({ type }: TabProps) => {

  const { collectingItems, loading, refetch } = useCollectingData(type)

  const { tags, selectedTags, filteredItems, onChangeTag } = useFilterTags(collectingItems)

  return (
    <Spin spinning={loading}>
      <div className='w-full flex flex-col h-[83vh]'>

        <div style={{ position: 'absolute', right: 0, top: -62 }}>
          <CreateUpdate type={type} onSuccess={refetch} />
        </div>

        <FilterTags
          tags={tags}
          value={selectedTags}
          onChange={onChangeTag}
        />

        <div className='flex-1 overflow-hidden'>
          <FilterList
            items={filteredItems}
            onRefresh={refetch}
          />
        </div>
      </div>
    </Spin>
  )
}
