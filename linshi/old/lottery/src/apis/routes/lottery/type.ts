import { LotteryType } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<LotteryType>({
  name: 'lottery/type',
  label: '彩种',
  Entity: LotteryType,
})

export {
  list,
  info,
  create,
  remove,
  update,
  LotteryType,
}
