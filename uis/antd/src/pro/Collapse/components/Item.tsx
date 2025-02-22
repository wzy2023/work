import React from 'react'
import { Collapse, CollapsePanelProps, Space } from 'antd'

export interface CollapseItemProps extends Omit<CollapsePanelProps, 'key'> {
  step?: boolean; // 为true自动给标题添加 `第{index}步：`
  index?: number; // step为true时才需要
  space?: boolean; // 子元素是否有间距
}

export const Item = (props: CollapseItemProps) => {
  const { step = true, header, index, space } = props

  return (
    <Collapse.Panel
      {...props}
      key={String(header)}
      header={step ? `第${index}步: ${header}` : header}
    >
      {space ? (
        <Space direction='vertical' size='small' style={{ width: '100%' }}>
          {props.children}
        </Space>
      ) : (
        props.children
      )}
    </Collapse.Panel>
  )
}
