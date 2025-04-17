import { useMemo, useState } from 'react'
import { PaginationProps } from 'antd'

export const usePaginationState = (paginationProps?: PaginationProps) => {
  const options: PaginationProps = {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `总共 ${total} 条`,
    pageSizeOptions: [10, 20, 30, 50],
    ...paginationProps,
  }

  const [current, setCurrent] = useState<number>(options.current!)
  const [pageSize, setPageSize] = useState<number>(options.pageSize!)

  const onChange = (current: number, pageSize: number) => {
    setCurrent(current)
    setPageSize(pageSize)
  }

  const resetPage = () => {
    setCurrent(1)
  }

  const pagination: PaginationProps = {
    ...options,
    current,
    pageSize,
    onChange,
  }

  const pageParams = useMemo(
    () => ({
      pageNum: current,
      pageSize,
    }),
    [current, pageSize],
  )

  return {
    // 重置到第一页
    resetPage,
    // Table pagination prop
    pagination,
    // 转换为后端的分页参数
    pageParams,
  }
}
