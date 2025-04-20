import { Profession } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<Profession>({
  name: 'quiz/profession',
  label: 'Profession',
  Entity: Profession,
})
export {
  list,
  info,
  create,
  remove,
  update,
  Profession,
}
