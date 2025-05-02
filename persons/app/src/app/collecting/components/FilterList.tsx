import React from 'react'

import { Card, Carousel, Col, Empty, Row, Tag, Typography, Image } from '@/components'
import { CreateUpdate } from './CreateUpdate'
import { Delete } from './Delete'

interface FilterListProps {
  items: Collecting.Item[]
  onRefresh: (params?: any) => any
}

export const FilterList: React.FC<FilterListProps> = (props: FilterListProps) => {
  const { items, onRefresh } = props

  if (items.length === 0) {
    return <Empty description='暂无数据' />
  }

  return (
    <Row gutter={[16, 16]}>
      {items.map(item => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={item.title}
              size='small'
              styles={{
                body: { padding: 0 },
              }}
              extra={
                <div style={{ display: 'flex', gap: 8 }}>
                  <CreateUpdate item={item} onSuccess={onRefresh} />
                  <Delete id={item.id} onSuccess={onRefresh} />
                </div>
              }
              actions={[
                <div key='tags'>
                  {item.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>,
              ]}
            >
              {item.images?.length && (
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <Carousel arrows>
                    {item.images.map((image, index) => (
                      <div key={index}>
                        <Image
                          alt=''
                          preview={false}
                          src={image}
                          style={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}

              <div className='p-1'>
                {item.description && (
                  <Typography.Paragraph type='secondary' ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
                    {item.description}
                  </Typography.Paragraph>
                )}
                <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 8 }}>
                  {item.content}
                </Typography.Paragraph>
              </div>
            </Card>
          </Col>
        )
      )}
    </Row>
  )
}
