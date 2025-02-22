import papaparse from 'papaparse'
import dayjs from 'dayjs'

export const downloadCsv = (dataSource: any, name?: string, columns?: any[]) => {
  if (!Array.isArray(dataSource)) {
    return
  }

  // 把 dataSource 里 非 string|number 的数据转换为 string 类型
  dataSource = dataSource.map(item => {
    const obj = {} as any
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const element = item[key]
        if (key !== 'rowSpan') {
          if (typeof element === 'string' || typeof element === 'number') {
            obj[key] = element
          } else if (Array.isArray(element)) {
            obj[key] = element.join(',')
          } else if (typeof element === 'object') {
            obj[key] = JSON.stringify(element)
          }
        }
      }
    }
    return obj
  })

  // 将数据转换为 CSV 格式
  const csv = papaparse.unparse(dataSource, columns ? { columns: columns.map(i => i.dataIndex) } : undefined)

  // 创建一个 Blob 对象
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  // 创建下载链接
  const downloadLink = document.createElement('a')
  downloadLink.href = URL.createObjectURL(blob)
  downloadLink.download = (name ? `${name}_` : '') + dayjs().format('YYYY-MM-DD HH:mm:ss') + '.csv'

  // 触发下载链接的点击事件
  downloadLink.click()
}
