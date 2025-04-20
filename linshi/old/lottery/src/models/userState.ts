import { useUserInfo } from '@/hooks'

export default () => {
  const { userInfo, loading, setUserInfo } = useUserInfo()

  return {
    userInfo,
    loading,
    setUserInfo,
  }
}
