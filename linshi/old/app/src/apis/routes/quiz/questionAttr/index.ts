import { QuestionAttr } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<QuestionAttr>({
  name: 'quiz/questionAttr',
  label: 'QuestonAttr',
  Entity: QuestionAttr,
})

export {
  list,
  info,
  create,
  remove,
  update,
  QuestionAttr,
}
