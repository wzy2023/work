import { CAC } from 'cac'
import { existsSync } from 'fs-extra'
import {
  splitPath,
  capitalizeFirstLetter,
  replaceAndCopyFile,
  parseColumns,
  addRoute,
  generateEntityClass,
  generateFormConfig,
} from './utils'

export default (cli: CAC) => {
  cli.command('g <type> <p> <cnName> <column>', '生成代码文件，使用方式：mi g 3 /user User name:varchar,age:tinyint,isMan:boolean=1')
  .action(async (type, p, cnName, column) => {
    const paths = splitPath(p)

    const columns = parseColumns(column)

    const name = paths[paths.length - 1]
    const modelName = capitalizeFirstLetter(name)

    const pathModelName = paths.slice(0, -1).join('/') + (paths.slice(0, -1) ? '/' : '') + modelName
    const projectPath = process.cwd()
    const templatesPath = `${__dirname}/templates`

    // 创建 model
    if (parseInt(type) >= 1) {
      const modelPath = `${projectPath}/src/apis/entities/${pathModelName}.ts`
      if (!existsSync(modelPath)) {
        const modelTempPath = templatesPath + '/model.temp'
        const modelIndexPath = `${projectPath}/src/apis/entities/index.ts`
        const content = generateEntityClass(columns)
        await replaceAndCopyFile(modelTempPath, modelPath, [
          [/\[modelName]/g, modelName],
          [/\[content]/, content],
        ])
        await replaceAndCopyFile(modelIndexPath, null, [
          [/(?:\r?\n)+$/, `\r\nexport * from './${pathModelName}'\r\n`],
        ])
        console.log(`${modelName}: Model 创建成功`)
      } else {
        console.log(`${modelName} Model 存在，已跳过`)
      }
    }

    // 创建 api
    if (parseInt(type) >= 2) {
      const apiPath = `${projectPath}/src/apis/routes/${paths.join('/')}/index.ts`
      if (!existsSync(apiPath)) {
        const apiTempPath = templatesPath + '/api.temp'
        const apiIndexPath = `${projectPath}/src/apis/index.ts`
        await replaceAndCopyFile(apiTempPath, apiPath, [
          [/\[cnName]/g, cnName],
          [/\[modelName]/g, modelName],
          [/\[pathModelName]/g, pathModelName],
        ])
        await replaceAndCopyFile(apiIndexPath, null, [
          [/(?:\r?\n)+$/, `\r\nexport * as ${name} from './routes/${paths.join('/')}'\r\n`],
        ])
        console.log(`${modelName}: Api 创建成功`)
      } else {
        console.log(`${modelName} Api 存在，已跳过`)
      }
    }

    // 创建 page
    if (parseInt(type) >= 3) {
      const pagePath = `${projectPath}/src/pages/${pathModelName}/index.tsx`
      if (!existsSync(pagePath)) {
        const pageTempPath = templatesPath + '/page.temp'
        const pageRoutesPath = `${projectPath}/config/routes.ts`
        const content = generateFormConfig(columns)
        await replaceAndCopyFile(pageTempPath, pagePath, [
          [/\[name]/g, name],
          [/\[content]/, content],
        ])
        await addRoute(pageRoutesPath, cnName, `/${paths.join('/')}`, `./${pathModelName}`)
        console.log(`${modelName}: Page 创建成功`)
      } else {
        console.log(`${modelName} Page 存在，已跳过`)
      }
    }
  })
}
