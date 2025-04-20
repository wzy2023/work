import React from 'react'
import { history, Outlet } from '@umijs/max'

import { Flex, Menu, Spin, Typography } from '@/components'

import { project } from '@/apis'
import { useRequestPro } from '@/hooks'
import { useInitMaterial } from './useInitMaterial'

export default () => {
  const { projectId, tab = 'prompt' } = useInitMaterial()

  const { data, loading } = useRequestPro(() => project.info(projectId!), {
    ready: !!projectId,
    refreshDeps: [projectId],
  })

  return (
    <Spin spinning={loading}>
      <Typography.Title level={3} style={{ marginBottom: 20 }}>
        {data?.name}
      </Typography.Title>

      <Flex dir='row' style={{ flex: 1, height: '90vh' }}>
        <Menu
          selectedKeys={[tab]}
          style={{ width: 110, height: '100%' }}
          items={[
            { key: 'prompt', label: 'Prompt' },
            { key: 'material', label: '素材管理' },
            { key: 'account', label: '账号管理' },
            { key: 'work', label: '作品管理' },
            { key: 'release', label: '发布管理' },
          ]}
          onClick={(item) => {
            history.push(`/project/detail/${projectId}/${item.key}`)
          }}
        />

        <div style={{ paddingLeft: 15, width: '100%', overflow: 'auto' }}>
          <Outlet />
        </div>
      </Flex>
    </Spin>
  )
}
