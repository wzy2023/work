import { LotteryRule } from '@/apis/entities'
import { generateApi, generateCrudApi, generateAlphabetArray, generateExpression } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<LotteryRule>({
  name: 'lottery/rule',
  label: '规则',
  Entity: LotteryRule,
})

// num: 生成的数量
// minSize: 最小需要的彩种长度
// size: 规则的长度，例如：a+a+b+c = 4
// batch: 批次备注
const batch = generateApi({
  url: '/lottery/rule/batch',
  successMsg: `批量创建规则成功`,
  fn: async (option: { num: number, minSize: number, size: number, remark?: string }) => {
    const { num, minSize, size, remark } = option

    const arr: string[] = []

    const letters: string[] = generateAlphabetArray(minSize)

    const list = await LotteryRule.find()

    for (let i = 0; i < num * 2; i++) {
      const content = generateExpression(letters, [size, size])

      if (arr.includes(content)) {
        continue
      }

      if (list.find(item => item.content === content)) {
        continue
      }

      arr.push(content)
    }

    const data = arr.slice(0, num)
    await LotteryRule.insert(data.map(content => ({
      content,
      minSize,
      size,
      remark,
    })))

    return {
      num: data.length,
    }
  },
})

export {
  list,
  info,
  create,
  remove,
  update,
  batch,
  LotteryRule,
}
