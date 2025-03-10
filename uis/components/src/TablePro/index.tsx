'use client'

import React, { ReactNode, useImperativeHandle, useRef } from 'react'
import { _ } from '@wzyjs/utils'
import {
  ActionType,
  ParamsType,
  ProColumns,
  ProFormInstance,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components'

export type { ActionType, ProColumns } from '@ant-design/pro-components'

export type TableProColumns<T, ValueType> = ProColumns<T, ValueType> & {
  summary?: (data: readonly T[]) => ReactNode,
}

export type TableProProps<T, U, ValueType = 'text'> = Omit<ProTableProps<T, U, ValueType>, 'columns'> & {
  columns: TableProColumns<T, ValueType>[]
}

const defaultTableProps = {
  rowKey: 'id',
  cardBordered: true,
  options: false,
  dateFormatter: 'string',
  headerTitle: '列表',
  scroll: {
    x: 'max-content',
  },
}

export const TablePro = <T extends Record<string, any>, U extends ParamsType, ValueType = 'text'>(props: TableProProps<T, U, ValueType>) => {
  const tableProps = _.merge(_.cloneDeep(defaultTableProps), props)

  const actionRef = useRef<ActionType>(undefined)
  useImperativeHandle(props.actionRef, () => actionRef?.current, [actionRef])

  const formRef = useRef<ProFormInstance>(undefined)
  useImperativeHandle(props.formRef, () => formRef?.current, [formRef])

  const defaultsSummary = (data: readonly T[]) => {
    return (
      <ProTable.Summary.Row>
        {tableProps.columns?.map((item: any, index: number) => {
          return (
            <ProTable.Summary.Cell key={index} index={index}>
              {item.summary?.(data) || ''}
            </ProTable.Summary.Cell>
          )
        })}
      </ProTable.Summary.Row>
    )
  }

  return (
    <ProTable
      {...tableProps}
      formRef={formRef}
      actionRef={actionRef}
      summary={tableProps.summary || defaultsSummary}
    />
  )
}
