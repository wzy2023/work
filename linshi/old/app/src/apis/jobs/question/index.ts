import { Cron } from '@wzyjs/midway/exports'
import { QuestionAttr, QuestionAttrCategory, QuestionType, Tech } from '@/apis/entities'
import js from './js'

@Cron.Job({
  cronTime: '0 10,11,15,16,17,18 * * *',
  // runOnInit: true,
})
export class PingJob implements Cron.IJob {
  async onTick() {
    const qs = js.filter(item => {
      if (
        !item.content ||
        !Object.keys(item.options)?.length ||
        !item.answer?.length ||
        item.type === QuestionType.SingleChoice && item.answer.length > 1 ||
        item.type === QuestionType.MultipleChoice && item.answer.length < 2
      ) {
        console.log(666, item)
        return false
      }
      return true
    })

    try {
      await QuestionAttr.save({
        // @ts-ignore
        category: QuestionAttrCategory.Tech,
        source: 'html',
        tech: await Tech.findOne({ where: { name: 'Html' } }),
        questions: qs,
      })
    } catch (err) {
      console.log(6662, err)
    }
  }
}
