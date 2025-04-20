import { TaskLog } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<TaskLog>({
  name: 'task-log',
  label: '任务记录',
  Entity: TaskLog,
})

export {
  list,
  info,
  create,
  remove,
  update,
  TaskLog,
}
