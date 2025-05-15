'use client'

import { useImperativeHandle } from 'react'
import { Select, SelectProps, Spin } from 'antd'
import { useRequest } from '@wzyjs/hooks'

export interface FetchSelectProps<I> extends SelectProps {
  selectRef?: any,
  isDetail?: boolean, // 只返回id 还是返回整个信息
  searchApi: (params: { search: string }) => Promise<any>,
  convertData?: (data: I[]) => any[],
  onChange?: (value: any) => void
}

export interface FetchSelectRef {
  refresh: () => void
}

export const FetchSelect = <I extends { id: string | number }, >(props: FetchSelectProps<I>) => {
  const { searchApi, convertData, onChange, isDetail = false, selectRef, ...other } = props

  const { data, run, loading, refresh } = useRequest(searchApi, {
    debounceWait: 100,
  })

  const onSearch = (value: string) => {
    run({ search: value })
  }

  useImperativeHandle(selectRef, () => ({
    refresh,
  }))

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      popupMatchSelectWidth={false}
      suffixIcon={null}
      filterOption={false}
      notFoundContent={loading ? <Spin size='small' /> : null}
      loading={loading}
      {...other}

      options={convertData ? convertData(data?.data || []) : data?.data}
      onSearch={onSearch}
      onChange={value => {
        if (isDetail) {
          const detail = data?.data?.find(item => item.id === value)
          onChange?.(detail)
        } else {
          onChange?.(value)
        }
      }}
    />
  )
}
