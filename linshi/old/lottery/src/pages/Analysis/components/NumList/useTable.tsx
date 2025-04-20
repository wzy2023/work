import React, { useMemo, useState } from 'react'
import { lotteryType } from '@/apis'
import { NumLists } from '@/apis/jobs/asalysis2/utils'

interface Option {
  current?: number
  lottery?: lotteryType.LotteryType
  numLists?: NumLists
}

export const useTable = (option: Option) => {
  const { lottery, numLists, current = 2000 } = option

  const pageSize = 20
  const [page, setPage] = useState(Math.ceil(current / pageSize))

  const columns = useMemo(() => {
    return [
      {
        title: 'i',
        dataIndex: 'index',
        width: 50,
        render: (index: number) => <span>{index + 1}</span>,
      },
      ...Array(lottery?.size).fill(true).map((_, index) => ({
        title: index + 1,
        key: index + 1,
        dataIndex: 'nums',
        width: 30,
        render: (nums: number[]) => nums[index],
      })),
    ]
  }, [lottery?.size])

  const dataSource: any[] = useMemo(() => {
    if (!numLists?.lottery || !numLists.forecast) {
      return []
    }
    return [...numLists.lottery, ...numLists.forecast].map((item, index) => ({
      index,
      nums: item,
    }))
  }, [numLists])

  return {
    columns,
    dataSource,
    rowKey: 'index',
    pagination: {
      pageSize,
      showSizeChanger: false,
      current: page,
      simple: true,
      onChange: setPage,
      position: ['bottomCenter'] as any,
    },
  }
}
