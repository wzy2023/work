'use client'

import React from 'react'

import { Button } from 'antd'
import { FormPro } from '../../FormPro'

import { useUpdate } from '@wzyjs/hooks'
import { Apis, Column, ApiParams } from '../types'

interface CreateProps<I> {
  name?: string,
  columns: Column<I>[],
  api: Apis<I>['create'],
  title?: string,
  layoutType?: 'ModalForm' | 'DrawerForm',
  initialValues?: Partial<I>,
  labelCol?: { span: number },
  wrapperCol?: { span: number },
  style?: React.CSSProperties,
  convertValues?: (values: Partial<I>) => Partial<I>,
  // 调用接口时的附加参数
  apiParams?: ApiParams
}

export const Create = <I, >(props: CreateProps<I>) => {
  const {
    name = '',
    style,
    layoutType = 'ModalForm',
    columns,
    initialValues,
    api,
    title = '新建',
    labelCol = { span: 4 },
    wrapperCol = { span: 19 },
    apiParams,
    convertValues = values => values,
  } = props

  const update = useUpdate()

  if (!api) {
    return null
  }

  return (
    <FormPro
      style={style}
      title={`${title}${name}`}
      layout='horizontal'
      layoutType={layoutType}
      initialValues={initialValues as any}
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
      columns={columns.filter((column) => !column.hideInCreate) as any}
      onFinish={async (formValues: Partial<I>) => {
        if (!api) {
          return
        }
        const { success } = await api(convertValues({ ...apiParams?.create, ...formValues }))
        return success
      }}
      trigger={(
        <Button onClick={() => setTimeout(update, 10)}>{title}</Button>
      )}
    />
  )
}
