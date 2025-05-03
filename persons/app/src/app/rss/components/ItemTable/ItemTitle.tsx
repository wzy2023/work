'use client'

import React from 'react'
import { BookFilled, BookOutlined } from '@/components'
import { ensureHttpPrefix } from '../../utils'

interface ItemTitleProps {
  record: any
}

export const ItemTitle = ({ record }: ItemTitleProps) => {
  return (
    <div className='flex items-center'>
      <span className='mr-2 flex-none'>
        {record.isRead ?
          <BookFilled style={{ color: '#d9d9d9' }} /> :
          <BookOutlined style={{ color: '#1890ff' }} />
        }
      </span>
      <a
        href={ensureHttpPrefix(record.link)}
        target='_blank'
        rel='noopener noreferrer'
        className='flex-grow'
      >
        {record.title}
      </a>
    </div>
  )
}
