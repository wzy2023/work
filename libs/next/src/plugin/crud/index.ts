import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Model } from '@zenstackhq/sdk/ast'
import type { PluginOptions } from '@zenstackhq/sdk'

export const name = 'Generate useModelCRUD'

const config = {
  template: {
    content: fs.readFileSync(path.resolve(__dirname, './useHabitGroupCRUD.ts'), 'utf-8'),
  },
}

export default async function run(model: Model, options: PluginOptions) {
  // 检查配置
  if (!options.output) {
    throw new Error('crud output is required')
  }

  // 过滤出来 model
  const modelNames = model.declarations.filter(item => item.$type === 'DataModel')

  // 创建目录
  if (modelNames.length) {
    if (!fs.existsSync(options.output as string)) {
      fs.mkdirSync(options.output as string)
    }
  }

  // 生成模板
  modelNames.forEach(({ name: ModelName }) => {
    let templateContent = config.template.content

    const modelName = ModelName.replace(/^./, (s) => s.toLowerCase())

    templateContent = templateContent.replace(/habitGroup/g, modelName)
    templateContent = templateContent.replace(/HabitGroup/g, ModelName)

    fs.writeFileSync(
      options.output as string + `/use${ModelName}CRUD.ts`,
      templateContent,
    )
  })

  // 创建 index.ts 导出所有代理
  const indexContent = modelNames.map(({ name: ModelName }) => {
    return `export * from './use${ModelName}CRUD'`
  }).join('\n')

  fs.writeFileSync(
    options.output as string + '/index.ts',
    indexContent + '\n',
  )
}
