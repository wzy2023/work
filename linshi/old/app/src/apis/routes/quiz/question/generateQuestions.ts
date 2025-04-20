import { generateApi } from '@/apis/utils'
import { QuestionAttrCategory } from '@/apis/entities/quiz/QuestionAttr'
import { Question } from '@/apis/entities/quiz/Question'
import { In } from 'typeorm'

enum Mode {
  Practice = 'Practice', //  练习
  Paper = 'Paper' //  试卷
}

interface Values {
  mode: Mode
  category: QuestionAttrCategory
  num: number
  question: string[]
}

export const generateQuestions = generateApi({
  successMsg: '生成成功',
  url: '/quiz/question/generate',
  fn: async (values: Values) => {

    if (values.category === QuestionAttrCategory.Tech) {
      let data = await Question.find({
        where: {
          attr: {
            tech: In([values.question].flat()),
          },
        },
      })

      if (values.mode === Mode.Practice) {
        return data
      }

      data = data.sort(() => Math.random() - 0.5)
      data = data.slice(0, values.num)

      return data
    }

  },
})
