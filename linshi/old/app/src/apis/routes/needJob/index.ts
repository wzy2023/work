import { NeedJob } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list } = generateCrudApi<NeedJob>({
  name: 'need-job',
  label: '需求工作',
  Entity: NeedJob,
})

export {
  list,
}
