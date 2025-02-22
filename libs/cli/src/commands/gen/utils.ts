import fsExtra from 'fs-extra'
import path from 'path'

export const splitPath = (path: string) => {
  return path.split('/').filter(Boolean)
}

// 将字符串的首字母转为大写
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 读取源文件，根据替换规则修改内容，并将结果写入目标文件。
 *
 * @param sourceFilePath - 源文件的路径。
 * @param targetFilePath - 目标文件的路径。
 * @param replacements - 替换规则数组，每个元素是一个包含两个字符串的数组，第一个字符串是要被替换的文本的RegExp，第二个字符串是替换成的文本。
 */
export const replaceAndCopyFile = async (sourceFilePath: string, targetFilePath: string | null, replacements: [RegExp, string][]): Promise<void> => {
  try {
    let result = await fsExtra.readFile(sourceFilePath, 'utf8')

    // 应用替换规则
    for (const [searchValue, newValue] of replacements) {
      result = result.replace(searchValue, newValue)
    }

    // 如果目标文件路径未定义，则修改源文件
    const filePathToWrite = targetFilePath || sourceFilePath

    // 确保目录存在
    const dirPath = path.dirname(filePathToWrite)
    await fsExtra.ensureDir(dirPath)

    // 将修改后的内容写入目标文件或源文件
    await fsExtra.writeFile(filePathToWrite, result, 'utf8')
  } catch (err) {
    console.error('操作文件失败:', err)
  }
}

/**
 * 添加新的页面到routes文件
 * @param routesFilePath routes文件路径
 * @param newName 要添加的页面名称
 * @param newPath 要添加的页面路径
 * @param newComponent 要添加的页面组件路径
 */
export const addRoute = async (routesFilePath: string, newName: string, newPath: string, newComponent: string) => {
  try {
    // 读取routes文件内容
    const routesContent = await fsExtra.readFile(routesFilePath, 'utf-8')

    // 使用更安全的方式解析routes文件内容
    const routes = new Function(routesContent.replace('export default', 'return'))()

    // 新的页面对象
    const newPage = {
      name: newName,
      path: newPath,
      component: newComponent,
      wrappers: ['@/wrappers/login'],
    }

    // 将新页面添加到routes数组中
    routes.splice(routes.length - 1, 0, newPage)

    // 将更新后的routes数组转换成字符串
    const updatedRoutesContent = `export default ${JSON.stringify(routes, null, 1)}\n`

    // 写回到routes文件
    await fsExtra.writeFile(routesFilePath, updatedRoutesContent, 'utf-8')

  } catch (error) {
    console.error('添加页面失败：', error)
  }
}

interface ColumnInfo {
  name: string;
  type: string;
  tsType: string;
  nullable?: boolean;
  default?: any;
}

const getTsType = (type: string): string => {
  const tsTypeMap = new Map<string[], string>()
  tsTypeMap.set(['int', 'tinyint', 'smallint', 'mediumint', 'bigint', 'float', 'double', 'decimal'], 'number')
  tsTypeMap.set(['char', 'varchar', 'binary', 'varbinary', 'tinyblob', 'blob', 'mediumblob', 'longblob', 'tinytext', 'text', 'mediumtext', 'longtext', 'enum', 'set'], 'string')
  tsTypeMap.set(['boolean'], 'boolean')
  tsTypeMap.set(['date', 'datetime', 'timestamp', 'time', 'year'], 'Date')

  for (const [keys, value] of tsTypeMap.entries()) {
    if (keys.includes(type)) {
      return value
    }
  }
  throw new Error(`错误的数据库字段类型: ${type}`)
}

export const parseColumns = (input: string): ColumnInfo[] => {
  return input.split(',').map(column => {
    const [nameAndType, defaultValue] = column.split('=')
    const [name, type] = nameAndType.split(':')
    return {
      name,
      type,
      tsType: getTsType(type),
      ...(defaultValue ? { default: defaultValue } : { nullable: true }),
    }
  })
}

export const generateEntityClass = (columns: ColumnInfo[]): string => {
  return columns.map(column => {
    const nullable = column.nullable ? ', nullable: true' : ''
    const defaultVal = column.default !== undefined ? `, default: ${column.default}` : ''
    return `  @Column({ type: '${column.type}'${nullable}${defaultVal} })
  ${column.name}${column.nullable ? '?' : '!'}: ${column.tsType}`
  }).join('\n\n').trimStart()
}

export const generateFormConfig = (columns: ColumnInfo[]): string => {
  return columns.map(column => {
    const title = column.name.charAt(0).toUpperCase() + column.name.slice(1)
    const validator = column.nullable ? '[]' : `['require']`
    const hideInSearch = column.tsType === 'boolean' ? 'true' : 'false'

    return `{
      title: '${title}',
      dataIndex: '${column.name}',
      ellipsis: true,
      ${validator.length ? `validator: ${validator},` : ''}
      hideInSearch: ${hideInSearch}
    }`
  }).join(',\n')
}
