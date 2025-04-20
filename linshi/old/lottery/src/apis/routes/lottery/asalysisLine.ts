import { generateCrudApi } from '@/apis/utils'
import { LotteryAsalysisLine } from '@/apis/entities'

const { list } = generateCrudApi<LotteryAsalysisLine>({
  name: 'lottery/asalysis/line',
  label: '分析折线',
  Entity: LotteryAsalysisLine,
})

export {
  list,
  LotteryAsalysisLine,
}
