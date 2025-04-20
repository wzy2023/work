import { useRequestPro } from '@/hooks'
import { lotteryAsalysis } from '@/apis'

export const useAsalysisDetail = (currentId?: string) => {
  const { data, loading } = useRequestPro(() => lotteryAsalysis.detail(currentId!), {
    ready: !!currentId,
    refreshDeps: [currentId],
  })

  return {
    loading,
    asalysisDetail: data,
  }
}
