const fs = require('fs')
const path = require('path')

const ignoredPaths = ['node_modules', 'plugin.ts', 'pnpm-lock.yaml', 'code.json', 'README.md', '1.js', 'assets', '.less']

const isHidden = (filePath) => (/(^|\/)\.[^\/\.]/g).test(filePath)

const shouldIgnore = (filePath) =>
  ignoredPaths.some(ignoredPath => filePath.includes(ignoredPath)) || isHidden(filePath)

const filesInfo = []

const processDirectory = async (dir, parentPath = '') => {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const fullFilePath = path.join(parentPath, file)

    if (shouldIgnore(fullFilePath)) continue

    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      await processDirectory(filePath, fullFilePath)
    } else {
      const content = fs.readFileSync(filePath, 'utf8')
      filesInfo.push({ filePath: fullFilePath, content })
    }
  }
}

const main = async () => {
  const outputFileName = './code.json'

  await processDirectory('/Users/wangzhenyu/Code/客户项目/uppeta/prod-management')

  fs.writeFileSync(outputFileName, JSON.stringify(filesInfo, null, 2))
  console.log('文件信息已保存到 ' + outputFileName)
}

main()
