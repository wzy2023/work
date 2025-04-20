import React, { createElement, useEffect, useState, useMemo } from 'react'
import { Space, TabPaneProps, Tabs, TabsProps } from 'antd'
import { useLocation, useModel } from '@umijs/max'
import styles from './index.less'

interface Tab extends Omit<TabPaneProps, 'tab'> {
  key?: string;
  label: string;
}

export interface TabsProProps extends Omit<TabsProps, 'items' | 'onChange'> {
  items?: Tab[];
  onChange?: null | TabsProps['onChange'],
  clearMenuOnChange?: boolean;
}

export const TabsPro = (props_: TabsProProps) => {
  const { pathname } = useLocation()

  const { active, setData } = useModel('anchorData')
  const [activeKey, setActiveKey] = useState<string>('')

  const props = {
    ...props_,
  }

  useEffect(() => {
    if (!props_.items?.find(i => i.label === active)) {
      if (!activeKey) {
        setActiveKey(props_.items?.[0]?.label || '')
      }
      return
    }
    setActiveKey(active)
    if (props_.clearMenuOnChange) {
      setData([])
    }
  }, [active])

  props.items = useMemo(() => {
    if (props.children || !props.items?.length) {
      return
    }
    return props.items = props.items.map(item => ({
      label: createElement(
        'a',
        { href: `#${pathname}#${encodeURI(item.label)}`, style: { color: 'inherit' } },
        <span id={encodeURI(item.label)}>{item.label}</span>,
      ),
      key: item.label,
      forceRender: !props.clearMenuOnChange ?? true,
      children: (
        <Space direction='vertical' style={{ width: '100%' }}>
          {item.children}
        </Space>
      ),
    })) as any
  }, [props])

  return (
    <div className={styles.tabs}>
      <Tabs
        activeKey={activeKey}
        destroyInactiveTabPane
        {...props as TabsProps}
      />
    </div>
  )
}
