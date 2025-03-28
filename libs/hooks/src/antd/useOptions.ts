// import { useEffect, useMemo, useState } from 'react'
// import { useRequestPro } from './useRequestPro'
//
// interface Option {
//   apis: any
//   onChange?: (data?: any) => void
// }
//
// export const useOptions = (option: Option) => {
//   const { apis } = option
//
//   const [value, setValue] = useState<string>()
//
//   // 发请求获取列表数据
//   const { data, loading } = useRequestPro(apis.list, {
//     onSuccess: res => {
//       const [first] = res.data?.data || []
//       if (first) {
//         setValue(first?.id)
//       }
//     },
//   })
//
//   // 将列表数据转换成 enableOptions
//   const enableOptions = useMemo(() => {
//     return data?.data.map((item: any) => ({ label: item.name, value: item.id })) || []
//   }, [data])
//
//   // 根据 value 获取当前详细数据
//   const currentData = useMemo(() => {
//     return data?.data.find((item: any) => item.id === value)
//   }, [data, value])
//
//   // value 变化时触发 onChange
//   useEffect(() => {
//     option.onChange?.(currentData)
//   }, [currentData])
//
//   return {
//     loading,
//     enableOptions,
//     value,
//     onChange: setValue,
//     currentData,
//   }
// }
