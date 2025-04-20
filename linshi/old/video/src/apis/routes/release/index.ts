import { Release } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, info } = generateCrudApi<Release>({
  name: 'submit',
  label: '发布',
  Entity: Release,
  relations: ['work', 'work.content'],
})

export {
  list,
  info,
  remove,
  Release,
}
