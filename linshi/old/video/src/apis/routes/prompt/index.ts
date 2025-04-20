import { Prompt } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<Prompt>({
  name: 'prompt',
  label: '提示词',
  Entity: Prompt,
})

export {
  list,
  info,
  create,
  remove,
  update,
  Prompt,
}
