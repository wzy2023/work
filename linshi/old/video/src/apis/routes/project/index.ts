import { Project } from '@/apis/entities'
import { generateCrudApi } from '@/apis/utils'

const { list, remove, update, info, create } = generateCrudApi<Project>({
  name: 'project',
  label: '项目列表',
  Entity: Project,
})

export {
  list,
  info,
  create,
  remove,
  update,
  Project,
}
