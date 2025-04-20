import { useMemo } from 'react'
import { String, Table, TableProps, TableColumnType } from '@/components'
import { isFunction } from '@/utils'
import { getRowSpan } from './utils'

interface Attr {
  key: string,
  label: string,
  isMerge?: boolean,
  isCopy?: boolean
}

interface ParamsTableProProps<I> extends TableProps<I> {
  data: I[]
}

export const ParamsTable = <I, >(props: ParamsTableProProps<I>) => {
  const defaultProps = {
    rowKey: '_id',
    bordered: true,
    pagination: false,
    showHeader: false,
    dataSource: props.data,
  }

  const props_ = Object.assign(defaultProps)

  // @ts-ignore
  const columns: TableColumnType<I>[] = useMemo(() => {
    // 支持的字段
    const attrs: Attr[] = [
      { key: 'label', label: '标签', isMerge: true },
      { key: 'attr', label: '属性', isMerge: true },
      { key: 'value', label: '值', isCopy: true },
      { key: 'default', label: '默认' },
      { key: 'desc', label: '描述' },
      { key: 'example', label: '示例', isCopy: true },
      { key: 'effect', label: '效果' },
      { key: 'attach', label: '附加' },
      { key: 'required', label: '必填' },
    ]

    // 生成的字段
    return attrs
    .map(item => (props_.dataSource?.[0]?.[item.key] ? { title: item.label, dataIndex: item.key, ...item } : null))
    .filter(i => i)
    .map(item => !item?.isMerge ? item : {
      ...item,
      render: (text, _, index) => ({
        children: text,
        props: {
          rowSpan: getRowSpan(props_.dataSource, item, index),
        },
      }),
    })
  }, [props_.dataSource])

  if (columns.length > 2) {
    props_.showHeader = props_.showHeader ?? true
  }

  // dataSource内string类型的数据包一层<Text>
  props_.dataSource = props_.dataSource.map((item: any) => Object.entries(item).reduce((obj: any, [key, value]) => {
    obj[key] = value
    if (typeof value === 'string') {
      // 这四个自动标红
      if (['label', 'attr', 'example'].includes(key)) {
        value = `‘${value}’`
      }
      const attr: any = columns.find(i => i.key === key) || {}
      obj[key] = (
        <String
          isCopy={attr?.isCopy}
          isEllipsis={attr?.isEllipsis}
        >
          {value as string}
        </String>
      )
    }
    return obj
  }, {})).map((item: any) => ({
    ...item,
    _id: Math.random(),
  }))

  return (
    <div style={{ overflow: 'scroll' }}>
      <Table<I[]>
        {...props_}
        columns={columns}
        expandable={props_.dataSource.some((item: any) => item.expandedRowRender) && {
          expandedRowRender: (record: any) => (
            <div style={{ marginLeft: 50 }}>
              {isFunction(record?.expandedRowRender) ? record?.expandedRowRender?.(record) : record?.expandedRowRender}
            </div>
          ),
          rowExpandable: (record: any) => !!record?.expandedRowRender,
        }}
      />
    </div>
  )
}
