import React from 'react'
import { Button } from 'antd'
import { Confirm, ConfirmProps } from './Confirm'

export interface GroupProps {
  list?: (ConfirmProps & { visible?: boolean, title?: string })[]
}

// 1. 按钮组
export const Group = (props: GroupProps) => {
  const { list = [] } = props

  if (!list?.length) {
    return null
  }

  return (
    <Button.Group>
      {list.filter(item => item.visible).map((item, index) => (
        <Confirm key={index} {...item}>{item.title}</Confirm>
      ))}
    </Button.Group>
  )
}
