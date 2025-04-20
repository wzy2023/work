import { useState } from 'react'
import { useRequest } from '@/hooks'
import { user } from '@/apis'

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>()

  const userInfoState = useRequest(user.me, {
    onSuccess: res => {
      setUserInfo(res.data)
    },
  })

  return {
    userInfo,
    setUserInfo,
    loading: userInfoState.loading,
  }
}
