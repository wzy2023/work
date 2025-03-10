// import { useEffect, useState } from 'react'
//
// import { pick } from 'lodash'
// import { useLocalStorageState, useRequest } from 'ahooks'
//
// import { user } from '@/services'
// import { User, PageKey } from '@/types'
//
// export const useUserInfo = () => {
//   const [token, setToken] = useLocalStorageState<user.LoginResult>('token')
//
//   const [userInfo, setUserInfo] = useState<User>()
//
//   const loginState = useRequest(user.login, {
//     manual: true,
//   })
//
//   const refreshState = useRequest(user.refresh, {
//     manual: true,
//   })
//
//   const userInfoState = useRequest(user.info, {
//     refreshDeps: [token?.access_token],
//     ready: !!token?.access_token,
//     debounceWait: 300,
//     onSuccess: res => {
//       setUserInfo(res.data)
//     },
//     onError: () => {
//       refreshToken()
//     },
//   })
//
//   const cacheToken = (data?: user.LoginResult) => {
//     if (!data) {
//       throw new Error('token failed')
//     }
//     data.expires_at = Date.now() + data.expires
//     setToken(data)
//   }
//
//   const refreshToken = async () => {
//     const token = JSON.parse(localStorage.getItem('token') || '{}')
//
//     if (token?.expires_at && ((token.expires_at - Date.now()) < (30 * 1000))) {
//       const res = await refreshState.runAsync(pick(token, 'refresh_token'))
//       cacheToken(res.data)
//     }
//   }
//
//   const login = async (data: user.LoginData) => {
//     if (!data) {
//       throw new Error('data is required')
//     }
//
//     const res = await loginState.runAsync(data)
//     cacheToken(res.data)
//   }
//
//   const logout = async () => {
//     if (!token) {
//       return
//     }
//     await user.logout({ refresh_token: token.refresh_token })
//     setToken(undefined)
//     setUserInfo(undefined)
//     location.reload()
//   }
//
//   useEffect(() => {
//     const timer = setInterval(async () => {
//       try {
//         await refreshToken()
//
//       } catch (err) {
//         clearInterval(timer)
//         if (location.pathname !== PageKey.Login) {
//           location.reload()
//         }
//       }
//     }, 10 * 1000)
//
//     return () => {
//       clearInterval(timer)
//     }
//   }, [])
//
//   return {
//     login,
//     loginLoading: loginState.loading,
//
//     userInfo,
//     userInfoLoading: userInfoState.loading,
//
//     logout,
//   }
// }
