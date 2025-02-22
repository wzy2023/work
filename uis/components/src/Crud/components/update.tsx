import React from 'react'

import { Button } from 'antd'
import { FormPro } from '../../FormPro'

import { useUpdate } from '@wzyjs/hooks'
import { Apis, Column } from '../types'

interface UpdateProps<I> {
  name?: string,
  columns: Column<I>[],
  initialValues: I,
  api: Apis<I>['update'],
  title?: string,
  layoutType?: 'ModalForm' | 'DrawerForm',
  labelCol?: { span: number },
  wrapperCol?: { span: number },
  style?: React.CSSProperties,
  convertValues?: (values: Partial<I>) => Partial<I>,
}

export default <I extends { id: string }>(props: UpdateProps<I>) => {
  const {
    name = '',
    style,
    layoutType = 'ModalForm',
    columns,
    initialValues,
    api,
    title = '编辑',
    labelCol = { span: 4 },
    wrapperCol = { span: 19 },
    convertValues = values => values,
  } = props

  const update = useUpdate()

  if (!api) {
    return null
  }

  return (
    <FormPro
      key={JSON.stringify(initialValues)}
      style={style}
      title={`${title}${name}`}
      layout='horizontal'
      layoutType={layoutType}
      initialValues={initialValues}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      {...({
        ModalForm: {
          modalProps: { destroyOnClose: true },
        },
        DrawerForm: {
          drawerProps: { destroyOnClose: true },
        },
      })[layoutType]}
      columns={columns.filter(column => !column.hideInUpdate) as any}
      onFinish={async (formValues: Partial<I>) => {
        if (!api) {
          return
        }
        const { success } = await api(initialValues.id, convertValues(formValues))
        return success
      }}
      trigger={(
        <Button type='link' onClick={() => setTimeout(update, 10)}>{title}</Button>
      )}
    />
  )
}
