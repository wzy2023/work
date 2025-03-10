'use client'

import React from 'react'
import { Button, Result } from 'antd'

export const NotFound = () => (
  <Result
    status='404'
    title='404'
    subTitle='Sorry, 这个页面找不到啦~'
    extra={
      <Button type='primary' onClick={() => window.location.href = '/'}>
        回到首页
      </Button>
    }
  />
)
