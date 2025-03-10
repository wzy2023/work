// import { useCallback, useEffect, useState } from 'react'
//
// export const useSetting = (key: string, defaultValue: any = {}) => {
//   // 分割 key 以支持嵌套结构
//   const keys = key.split('.')
//
//   // 获取初始值
//   const getInitialSetting = useCallback(() => {
//     if (typeof window === 'undefined') return defaultValue
//     try {
//       const stored = localStorage.getItem('settings')
//       if (!stored) return defaultValue
//       let result = JSON.parse(stored)
//       for (let k of keys) {
//         if (result[k] === undefined) {
//           return defaultValue
//         }
//         result = result[k]
//       }
//       return result
//     } catch (error) {
//       console.error('从 localStorage 读取设置失败:', error)
//       return defaultValue
//     }
//   }, [keys])
//
//   const [setting, setSettingState] = useState(getInitialSetting)
//
//   // 更新 localStorage
//   const setSetting = useCallback(
//     (newSetting: any) => {
//       setSettingState(newSetting)
//       if (typeof window === 'undefined') return
//       try {
//         const stored = localStorage.getItem('settings')
//         const parsed = stored ? JSON.parse(stored) : {}
//
//         let current = parsed
//         for (let i = 0; i < keys.length - 1; i++) {
//           if (current[keys[i]] === undefined || typeof current[keys[i]] !== 'object') {
//             current[keys[i]] = {}
//           }
//           current = current[keys[i]]
//         }
//         current[keys[keys.length - 1]] = newSetting
//
//         localStorage.setItem('settings', JSON.stringify(parsed))
//       } catch (error) {
//         console.error('向 localStorage 写入设置失败:', error)
//       }
//     },
//     [keys],
//   )
//
//   // 监听 localStorage 中 settings 的变化
//   useEffect(() => {
//     const handleStorageChange = (event: any) => {
//       if (event.key === 'settings') {
//         setSettingState(getInitialSetting())
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => {
//       window.removeEventListener('storage', handleStorageChange)
//     }
//   }, [getInitialSetting])
//
//   return [setting, setSetting]
// }
