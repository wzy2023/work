import { Tech, TechCategory } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create, enumsMap } = generateCrudApi<Tech>({
  name: 'quiz/tech',
  label: 'Tech',
  Entity: Tech,
})

const getEnumsMap = enumsMap({ category: TechCategory })

export {
  list,
  info,
  create,
  remove,
  update,
  getEnumsMap,
  Tech,
  TechCategory,
}
