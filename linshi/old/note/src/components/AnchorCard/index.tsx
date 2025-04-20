import React, { createElement, useEffect, ReactNode } from 'react'
import { useModel, useLocation } from '@umijs/max'
import { Card, CardProps, Space, Tag, PageHeader } from '@/components'
import styles from './index.less'

export interface AnchorCardProps extends CardProps {
  mode?: 'default' | 'anchor',
  title: string,
  titleSize?: 1 | 2 | 3 | 4 | 5 | 6,
  spaceSize?: number,
  padding?: number | { head?: number, body?: number },
  subTitle?: ReactNode,
  tags?: string[],
  parent?: string,
}

export const AnchorCard = (props: AnchorCardProps) => {
  const defaultProps = {
    spaceSize: 8,
    size: 'small',
    titleSize: 4,
    mode: 'anchor',
    bordered: props.mode === 'default',
    tags: [],
    headStyle: {
      paddingLeft: (props?.padding as any)?.head ? (props?.padding as any)?.head : typeof props.padding === 'number' ? props.padding : props.mode === 'anchor' ? 0 : undefined,
    },
    bodyStyle: {
      padding: (props?.padding as any)?.body ? (props?.padding as any)?.body : typeof props.padding === 'number' ? props.padding : 0,
    },
  }

  const {
    mode,
    titleSize,
    title,
    subTitle,
    spaceSize,
    tags = [],
    parent,
    ...rest
  }: AnchorCardProps = Object.assign(defaultProps, props)

  const { pathname } = useLocation()
  const { push } = useModel('anchorData')

  // 将当前卡片的名称加入右侧锚点列表
  useEffect(() => {
    push({ name: title, parent })
  }, [])

  // 处理元素
  const handleChildren = (childrens: any) => {
    return [childrens].flat().map((child: any) => {
      if (child?.type?.name === 'AnchorCard') {
        return React.cloneElement(child, {
          parent: title,
          titleSize: titleSize + 1,
        })
      }
      if (child?.type?.name === 'TabsPro') {
        child.props.items.forEach((item: any) => {
          push({ name: item.label, parent: title })
        })
      }
      return child
    })
  }

  return (
    <div className={styles.container}>
      <Card
        {...rest}
        id={encodeURI(title)}
        title={(
          <PageHeader
            title={(
              <Space>
                {createElement(
                  'h' + titleSize,
                  { className: styles.title },
                  <a href={`#${pathname}#${encodeURI(title)}`}>{title}</a>,
                ) as any}
              </Space>
            )}
            subTitle={subTitle as any}
            tags={tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          />
        )}
      >
        <Space size='small' direction='vertical' style={{ width: '100%' }}>
          {handleChildren(props.children)}
        </Space>
      </Card>
    </div>
  )
}
