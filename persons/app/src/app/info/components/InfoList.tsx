import React from 'react'

import { Button, Card, Col, CopyOutlined, message, Row, Space, Switch, Tag, Typography } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Delete } from './Delete'

import { useAiInfoCRUD } from '@/api/generated/crud'

interface InfoListProps {
  list?: Ai.Info[]
  onSuccess: () => void
}

export const InfoList = (props: InfoListProps) => {
  const { list, onSuccess } = props

  const { updateState } = useAiInfoCRUD({
    list: false,
    update: {
      onSuccess,
    },
  })

  const onSwitch = (checked: boolean, record: Ai.Info) => {
    updateState.mutate(record.id, { enabled: checked })
  }

  const onCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
    message.success('内容已复制')
  }

  return (
    <Row gutter={[16, 16]}>
      {(list || []).map(item => (
        <Col key={item.id} xs={24} md={12} lg={6}>
          <Card
            size='small'
            title={(
              <Space style={{ width: '100%' }}>
                <Tag color={item.enabled ? 'success' : 'error'}>
                  {item.enabled ? '启用' : '禁用'}
                </Tag>
                <div>
                  {item.title}
                </div>
              </Space>
            )}
            extra={
              <Switch
                size='small'
                checked={item.enabled}
                onChange={(checked) => onSwitch(checked, item)}
              />
            }
            actions={[
              <Button
                key='copy'
                type='text'
                title='复制内容'
                icon={<CopyOutlined />}
                onClick={() => onCopyContent(item.content || '')}
              />,
              <CreateUpdate
                key='edit'
                item={item}
                onSuccess={onSuccess}
              />,
              <Delete
                key='delete'
                id={item.id}
                onSuccess={onSuccess}
              />,
            ]}
          >
            <div className='mb-3'>
              {item.tags?.map((tag: string) => (
                <Tag key={tag} className='mr-1 mb-1'>
                  {tag}
                </Tag>
              ))}
            </div>

            <div className='mb-3'>
              <Typography.Paragraph ellipsis={{ rows: 5 }}>
                {item.content}
              </Typography.Paragraph>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
