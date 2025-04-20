const fs = require('fs')
const path = require('path')
const lodash = require('lodash')
const consola = require('consola')
const watch = require('watch')
const { getIndexName, getDirsAndFiles, sortNames, generateFileRouter } = require('./utils')

// 配置
const config = {
  // pages的目录
  pagesPath: path.resolve('./src/pages'),

  // 要写入的routes路径
  jsonPath: path.resolve('./config/routeJson.ts'),

  // 忽略的名称
  ignore: {
    file: ['Welcome.tsx', '404.tsx'],
    dir: ['blocks', 'components'],
  },

  // 省略的文件名称，如果某个目录下只有1个该文件，则不作为子菜单显示，而是直接点父菜单显示
  ellipsis: ['index.tsx', 'index.jsx'],
}

// 生成路由数据
const generateRoutes = (dirPath, topPath = '') => {
  // 获取指定目录下的,所有文件和子目录
  const { dirs = [], files = [] } = getDirsAndFiles(dirPath)

  // 将目录，根据序号排序，并忽略指定名称的目录
  const route = sortNames(dirs)
  .filter(i => !config.ignore.dir.includes(i))
  .map(item => {

    // 如果只有1个ellipsis文件
    const { files = [] } = getDirsAndFiles(`${dirPath}//${item}`)
    if (files.length === 1 && config.ellipsis.includes(files[0])) {
      return generateFileRouter(item, topPath)
    }

    return {
      path: encodeURI(item),
      name: getIndexName(item).name,
      component: !topPath ? '@/components/PageBase' : undefined,
      routes: generateRoutes(`${dirPath}//${item}`, `${topPath}/${item}`),
    }
  })

  // 将文件，根据序号排序，并忽略指定名称的文件
  route.push(...sortNames(files)
  .filter(i => !config.ignore.file.includes(i))
  .map(item => generateFileRouter(path.parse(item).name, topPath)))

  // 加入404
  route.push({ component: './404' })

  return route
}

// 监听
watch.watchTree(config.pagesPath, lodash.debounce(() => {
  consola.success(666, '监听到[pages]的改变，正在重新生成routes...')
  fs.writeFileSync(config.jsonPath, `export default ${JSON.stringify(generateRoutes(config.pagesPath, ''))}`)
}, 100))
