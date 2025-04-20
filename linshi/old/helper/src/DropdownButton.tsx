import React from 'react'
import { Dropdown, Button, DownOutlined, Space } from '@wzyjs/component-web'

interface DropdownButtonProps {
  child: any;
  onClickEvent: any;
}

export const DropdownButton = (props: DropdownButtonProps) => {
  const { child, onClickEvent } = props

  const onClickButton = (index: number) => {
    const item = child.list[index]
    onClickEvent[item.type || child.type](item.value)
  }

  return (
    <Dropdown
      menu={{
        items: child.list.map((item: any, index: number) => ({ ...item, key: index, label: item.label || item.value })),
        onClick: ({ key }: any) => onClickButton(key),
      }}
    >
      <Button size='small' onClick={() => onClickButton(0)}>
        <Space>
          {child.label}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
