export const getRowSpan = <I extends object>(data: I[], column: { dataIndex: keyof I }, index: number) => {
  if (index > 0 && data[index][column.dataIndex] === data[index - 1][column.dataIndex]) {
    return 0
  }
  if (Object.keys(data[index]).length === 0) {
    return 1
  }
  return data.reduce((t, i) => {
    if (!data[index][column.dataIndex] && !i[column.dataIndex]) {
      return 1
    }
    return data[index][column.dataIndex] === i[column.dataIndex] ? t + 1 : t
  }, 0)
}
