import { Question } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<Question>({
  name: 'quiz/question',
  label: 'Queston',
  Entity: Question,
})

export {
  list,
  info,
  create,
  remove,
  update,
  Question,
}
