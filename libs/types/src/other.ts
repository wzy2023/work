// 选项
export interface Option<V extends string | number = string> {
  label: string,
  value: V,
  children?: Option<V>[],
}

// 分页
export interface Pagination {
  current?: number,
  pageSize?: number,
}
