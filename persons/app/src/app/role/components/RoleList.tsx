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

import { useAiRoleCRUD, useAiInfoCRUD } from '@/api/generated/crud'

interface RoleListProps {
  list?: Ai.Role[]
  onSuccess: () => void
}

export const RoleList = (props: RoleListProps) => {
  const { list, onSuccess } = props

  const { updateState } = useAiRoleCRUD({
    list: false,
    update: {
      onSuccess,
    },
  })

  // 获取信息列表用于替换@提及
  const { listState: infoListState } = useAiInfoCRUD({
    list: {
      query: {
        where: {
          enabled: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  // 处理每个角色的 previewContent
  const getPreviewContent = (content: string) => {
    let processedContent = content
    const infoList = infoListState.data || []

    if (content && infoList.length > 0) {
      // 匹配@开头直到换行符的内容，可以包含空格
      const mentionRegex = /@([^\n@]+?)(?=\n|@|$)/g

      // 替换所有@信息名称为实际内容
      processedContent = content.replace(mentionRegex, (match, title) => {
        const trimmedTitle = title.trim()
        const info = infoList.find(info => info.title === trimmedTitle)
        return info ? info.content || match : match
      })
    }

    return processedContent
  }

  const onSwitch = (checked: boolean, record: Ai.Role) => {
    updateState.mutate(record.id, { enabled: checked })
  }

  const onCopyContent = (content: string) => {
    const previewContent = getPreviewContent(content)
    navigator.clipboard.writeText(previewContent)
    message.success('内容已复制')
  }

  return (
    <Row gutter={[16, 16]}>
      {(list || []).map(item => (
        <Col key={item.id} xs={24} md={12} lg={8}>
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
                onClick={() => onCopyContent(item.content)}
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
              {item.tags?.length > 0 && (
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
