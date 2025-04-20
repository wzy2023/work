import { Copywriter } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<Copywriter>({
  name: 'copywriter',
  label: '文案',
  Entity: Copywriter,
})

export {
  list,
  info,
  create,
  remove,
  update,
  Copywriter,
}
