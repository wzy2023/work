import React from 'react'

import {
  Typography,
  Switch,
  Card,
  Tag,
  Button,
  message,
  Row,
  Col,
  CopyOutlined,
} from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Delete } from './Delete'

import { api } from '@/api/react'

import { useAiRoleCRUD } from '@/api/generated/crud'

interface ListProps {
  list?: Ai.Role[]
  onSuccess: () => void
}

export const List = (props: ListProps) => {
  const { list, onSuccess } = props

  const { updateState } = useAiRoleCRUD({
    list: false,
    update: {
      onSuccess,
    },
  })

  const getPromptState = api.custom.aiRole.getPrompt.useMutation()

  const onSwitch = (checked: boolean, record: Ai.Role) => {
    updateState.mutate(record.id, { enabled: checked })
  }

  const onCopyContent = async (id: string) => {
    const previewContent = await getPromptState.mutateAsync({ id })
    navigator.clipboard.writeText(previewContent)
    message.success('内容已复制')
  }

  return (
    <Row gutter={[16, 16]} style={{ overflow: 'auto', height: 'calc(100vh - 210px)' }}>
      {(list || []).map(item => (
        <Col key={item.id} xs={24} md={8} lg={6}>
          <Card
            size='small'
            title={item.title}
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
                icon={<CopyOutlined />}
                onClick={() => onCopyContent(item.id)}
                title='复制内容'
              />,
              <CreateUpdate
                key='edit'
                initialValues={item}
                onSuccess={onSuccess}
              />,
              <Delete
                key='delete'
                id={item.id}
                onSuccess={onSuccess}
              />,
            ]}
          >
            <div className='flex justify-between'>
              {(item.tags?.length || 0) > 0 && (
                <div className='mb-3'>
                  {item.tags?.map((tag: string) => (
                    <Tag key={tag} className='mr-1 mb-1'>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}

              <div className='mb-3'>
                <Tag color={item.enabled ? 'success' : 'error'}>
                  {item.enabled ? '启用' : '禁用'}
                </Tag>
              </div>
            </div>

            <div className='mb-3'>
              <Typography.Paragraph ellipsis={{ rows: 5 }}>
                {item.content}
              </Typography.Paragraph>
            </div>

            {item.project && (
              <div className='mb-3'>
                <strong className='mr-1'>项目:</strong>
                <span>{item.project}</span>
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  )
}
