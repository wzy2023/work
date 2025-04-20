import { useRequestPro } from '@/hooks'
import { lotteryAsalysis } from '@/apis'

export const useAsalysisList = () => {
  const { data, loading } = useRequestPro(lotteryAsalysis.list, {
    defaultParams: [{
      pagination: {
        pageSize: 20,
      },
      order: {
        createdAt: 'DESC',
      },
    }],
  })

  return {
    loading,
    asalysisList: data?.data || [],
  }
}
