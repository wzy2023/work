import { useState } from 'react'
import { lotteryType } from '@/apis'
import { useAsalysisDetail, useDefault, useShowIndex, useAsalysisList } from './hooks'

export default () => {
  // 当前的彩种
  const [lottery, setLottery] = useState<lotteryType.LotteryType>()

  // 显示的数量
  const { hotIndex, showIndexNum, calcIndexNum, renderShowIndex } = useShowIndex()

  // 分析列表
  const { asalysisList, loading: asalysisListLoading } = useAsalysisList()

  // 当前分析id
  const { currentId, setCurrentId } = useDefault(asalysisList)

  // 当前分析详情
  const { asalysisDetail, loading: asalysisDetailLoading } = useAsalysisDetail(currentId)

  return {
    lottery,
    setLottery,

    currentId,
    setCurrentId,

    asalysisDetail,
    asalysisDetailLoading,

    asalysisList,
    asalysisListLoading,

    hotIndex,
    showIndexNum,
    calcIndexNum,
    renderShowIndex,
  }
}
