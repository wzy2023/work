import { FindOptionsWhere } from 'typeorm'
import { LotteryAsalysis } from '@/apis/entities'
import { generateApi, generateCrudApi } from '@/apis/utils'

const { list } = generateCrudApi<LotteryAsalysis>({
  name: 'lottery/asalysis',
  label: '分析',
  Entity: LotteryAsalysis,
})

const detail = generateApi({
  url: '/lottery/asalysis/detail',
  successMsg: '获取分析详情成功',
  fn: async (id: string) => {
    if (!id) {
      throw new Error(`获取分析详情失败，id 不能为空`)
    }

    const info = await LotteryAsalysis.findOne({
      where: { id } as FindOptionsWhere<LotteryAsalysis>,
      relations: ['possibilities'],
    })

    if (!info) {
      throw new Error(`获取分析详情失败`)
    }

    return info
  },
})

export {
  list,
  detail,
  LotteryAsalysis,
}
