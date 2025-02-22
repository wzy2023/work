import fs from 'fs'
import path from 'path'

// 定义配置项接口
interface MergeConfig {
  ignoreDirs?: string[];    // 忽略的目录
  ignoreFiles?: string[];   // 忽略的文件
  allowedExtensions?: string[]; // 允许的文件扩展名
  includeHiddenDirs?: boolean; // 是否包含隐藏目录
}

// 默认配置
const defaultConfig: MergeConfig = {
  ignoreDirs: ['node_modules', '.git'],  // 默认忽略 node_modules 和 .git
  ignoreFiles: [],  // 默认不忽略文件
  allowedExtensions: ['.ts', '.js'],  // 只允许处理 .ts 和 .js 文件
  includeHiddenDirs: false,  // 默认不包含隐藏目录
}

// 递归获取所有文件
const getAllFiles = (dirPath: string, config: MergeConfig = defaultConfig, filesArray: string[] = []): string[] => {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      const isHidden = path.basename(filePath).startsWith('.')  // 检查是否为隐藏目录
      // 忽略隐藏目录（除非配置明确包含）和配置中的忽略目录
      if (!isHidden || config.includeHiddenDirs) {
        if (!config.ignoreDirs?.some((dir) => filePath.includes(dir))) {
          getAllFiles(filePath, config, filesArray) // 递归读取子目录
        }
      }
    } else if (
      config.allowedExtensions?.includes(path.extname(file)) &&  // 只处理指定扩展名文件
      !config.ignoreFiles?.some((ignoreFile) => filePath.includes(ignoreFile))  // 忽略配置中的文件
    ) {
      filesArray.push(filePath)
    }
  })

  return filesArray
}

// 合并代码文件内容
const mergeCodeFiles = (dirPath: string, config: MergeConfig = defaultConfig, maxSize: number): string => {
  let mergedContent = ''
  const files = getAllFiles(dirPath, config)

  files.forEach((filePath) => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      // 使用文件长度代替文件内容展示，小于 maxSize 的才展示
      if (fileContent.length <= maxSize) {
        mergedContent += `### ${filePath.replace(dirPath, '')}\n\`\`\`${path.extname(filePath).slice(1)}\n${fileContent}\n\`\`\`\n\n`
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error)
    }
  })

  return mergedContent
}

// 保存合并后的内容到 .md 文件
const saveAsMarkdown = (content: string, outputFile: string): void => {
  try {
    fs.writeFileSync(outputFile, content, 'utf-8')
    console.log(`Merged code saved as: ${outputFile}`)
  } catch (error) {
    console.error(`Error writing file ${outputFile}:`, error)
  }
}

export default async () => {
  // 使用配置进行项目文件合并
  const projectDir = process.cwd()
  const outputMarkdownFile = path.resolve('./summary.md') // 输出的Markdown文件

  // 获取当前脚本路径并加入忽略
  const currentScriptPath = path.resolve(__filename) // 获取当前脚本路径

  // 定义自定义配置
  const customConfig: MergeConfig = {
    ignoreDirs: ['node_modules', 'dist', 'linshi', 'helper', 'projects', 'shells'],  // 忽略 dist 等目录
    ignoreFiles: [currentScriptPath],  // 忽略当前脚本文件
    allowedExtensions: ['.ts', '.js', '.json'],  // 允许 .ts、.js 和 .json 文件
    includeHiddenDirs: false,  // 默认不读取隐藏目录
  }

  // 执行合并和保存
  const mergedContent = mergeCodeFiles(projectDir, customConfig, 3000)
  saveAsMarkdown(mergedContent, outputMarkdownFile)
}
