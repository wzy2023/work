import React from 'react'
import { Tabs } from '@/components'
import NeedList from './components/NeedList'
import JobList from './components/JobList'

export default () => (
  <Tabs
    destroyInactiveTabPane
    items={[
      { label: '需求列表', key: '需求列表', children: <NeedList /> },
      { label: '岗位列表', key: '岗位列表', children: <JobList /> },
    ]}
  />
)
