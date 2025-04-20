// import { useState } from 'react'
// import { useRequestPro } from '@wzyjs/hooks'
// import { setting } from '@/api'
//
// export const useSetting = <I>(type: string) => {
//   const [value, setValue] = useState<I>()
//
//   const settingFind = useRequestPro(() => setting.settingFind({ type }), {
//     onSuccess: (res) => {
//       setValue(res?.data?.value as any)
//     }
//   })
//
//   const settingUpdate = useRequestPro(setting.settingUpdate, {
//     manual: true,
//   })
//
//   const settingCreate = useRequestPro(setting.settingCreate, {
//     manual: true,
//   })
//
//   return {
//     value,
//     loading: settingFind?.loading || settingCreate?.loading || settingUpdate?.loading,
//     saveSetting: async (value: I) => {
//       if (!settingFind) {
//         return
//       }
//       const { data } = settingFind
//
//       if (data) {
//         await settingUpdate?.run(data._id, { ...data, value })
//         return
//       }
//
//       await settingCreate?.run({ type, value })
//     }
//   }
// }
