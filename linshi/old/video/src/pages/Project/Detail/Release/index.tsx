import React from 'react'
import { useParams } from '@umijs/max'

import { Crud, Space, Tag, Tooltip, Video as VideoCom } from '@/components'

import { release } from '@/apis'
import { copy } from '@/utils'
import { Params, ReleaseStatus } from '../../types'

export default () => {
  const { projectId } = useParams<Params>()

  return (
    <Crud
      apis={release}
      search={false}
      apiParams={{
        list: {
          project: { id: projectId },
        },
      }}
      columns={[
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
          fixed: 'left',
        },
        {
          dataIndex: ['work', 'title'],
          title: '标题',
        },
        {
          title: '内容',
          dataIndex: 'work',
          hideInSearch: true,
          hideInForm: true,
          render: (work: any) => {
            return (
              <Space>
                {work?.content?.map((item: any, index: number) => (
                  <VideoCom key={index} width={90} height={160} url={item?.data?.url} />
                ))}
              </Space>
            )
          },
        },
        {
          title: '评论',
          dataIndex: 'work',
          hideInSearch: true,
          hideInForm: true,
          render: (work: any) => (
            <Space direction='vertical' size='small'>
              {work?.comments?.map((item: any, index: number) => (
                <Tag key={index} onClick={() => copy(item)} style={{ cursor: 'pointer' }}>{item}</Tag>
              ))}
            </Space>
          ),
        },
        {
          title: '状态',
          dataIndex: 'results',
          render: (results: any[]) => {
            return (
              <Space direction='vertical' size='small'>
                {results?.map((item, index) => (
                  <Tooltip key={index} title={item.reason}>
                    <Tag color={item.status === ReleaseStatus.Success ? '#87d068' : '#f50'}>
                      {item.platform}
                    </Tag>
                  </Tooltip>
                ))}
              </Space>
            )
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
          hideInSearch: true,
          hideInForm: true,
        },
      ]}
    />
  )
}
