'use client'

import React from 'react'
import { ButtonPro } from '@wzyjs/antd'
import { Apis } from '../types'

interface RemoveProps<I> {
  initialValues: I,
  api: Apis<I>['remove'],
  title?: string,
}

export default <I extends { id: string }>(props: RemoveProps<I>) => {
  const { api, initialValues, title = '删除' } = props

  if (!api) {
    return null
  }

  return (
    <ButtonPro.Confirm
      title={`确认${title}?`}
      btnProps={{
        danger: true
      }}
      onConfirm={() => {
        api(initialValues.id)
      }}
    >
      {title}
    </ButtonPro.Confirm>
  )
}
