import React from 'react'
import { Collapse, CollapseProps } from 'antd'
import { Item, CollapseItemProps } from './components/Item'

export interface CollapseProProps extends CollapseProps {
  list?: CollapseItemProps[],
  step?: boolean; // 为true自动给标题添加 `第{index}步：`
  space?: boolean; // 子元素是否有间距
}

export const CollapsePro = (props: CollapseProProps) => {
  const { list = [], step = false, space = true, accordion = true } = props

  if (!props.children && list.length) {
    props.children = list.map((item, index) => (
      <Item key={index} step={step} space={space} index={index + 1} {...item} />
    ))
  }

  return (
    <Collapse accordion={accordion} {...props} />
  )
}

CollapsePro.Pane = Item
