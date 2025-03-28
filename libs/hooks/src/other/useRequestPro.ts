// import { message } from 'antd'
// import { useRequest } from 'ahooks'
// import { noop, omit } from '@wzyjs/utils'
// import { RequestRes } from '@wzyjs/types'
// import { Options, Result, Service } from 'ahooks/lib/useRequest/src/types'
//
// // 在 useRequest 的基础上扩展的功能
// interface UserOptions<P extends any[], R> extends Options<R, P> {
//   alertErrorMessage?: false | string,
//   alertSuccessMessage?: true | string,
// }
//
// // 取出 data 里的 data
// interface IResult<R extends RequestRes, P extends any[]> extends Omit<Result<R, P>, 'data'> {
//   data?: R['data'],
// }
//
// const defaultResult = {
//   loading: false,
//   data: undefined,
//   error: undefined,
//   params: [],
//   cancel: noop,
//   refresh: noop,
//   refreshAsync: noop,
//   run: noop,
//   runAsync: noop,
//   mutate: noop,
// }
//
// export const useRequestPro = <P extends any[], R extends RequestRes>(
//   reqPromise?: Service<R, P>,
//   userOptions?: UserOptions<P, R>,
// ): IResult<R, P> => {
//   if (!reqPromise) {
//     return defaultResult as IResult<R, P>
//   }
//
//   const { alertErrorMessage = true, alertSuccessMessage = false } = userOptions || {}
//
//   const defaultOptions = {
//     debounceWait: 300,
//     throttleWait: 300,
//     onError: (err: Error, params: P) => {
//       if (alertErrorMessage) {
//         message.error(typeof alertErrorMessage === 'string' ? alertErrorMessage : err.message || '请求失败')
//       }
//       userOptions?.onError?.(err, params)
//     },
//     onSuccess: (res: R, params: P) => {
//       // 如果失败，则还是调用 onError
//       if (!res?.success) {
//         defaultOptions.onError(new Error(res?.message), params)
//         return
//       }
//
//       // 如果成功，并且需要自动弹出提示
//       if (alertSuccessMessage) {
//         message.success(typeof alertSuccessMessage === 'string' ? alertSuccessMessage : res.message || '请求成功')
//       }
//       userOptions?.onSuccess?.(res, params)
//     },
//   }
//
//   // 用户配置与默认配置合并
//   const enableOptions = Object.assign(defaultOptions, omit(userOptions, ['onSuccess', 'onError']))
//
//   // 取出 data 里的 data
//   const state = useRequest(reqPromise, enableOptions)
//   state.data = state.data?.data
//
//   return state
// }
