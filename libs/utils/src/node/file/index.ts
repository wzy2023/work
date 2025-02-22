import fs from 'fs-extra'
import axios from 'axios'
import url from 'url'
import * as path from 'path'

export const replaceContentInFile = async (filePath: string, targetContent: string, replacement: string): Promise<void> => {
  try {
    const data = await fs.readFile(filePath, 'utf8')

    if (replacement && data.includes(replacement)) {
      console.error(`已替换过：${filePath}`)
      return
    }

    if (!data.includes(targetContent)) {
      console.error(`不包含目标内容：${targetContent}`)
      throw new Error(`不包含目标内容：${targetContent}`)
    }

    const updatedData = data.replace(new RegExp(targetContent, 'g'), replacement)
    await fs.writeFile(filePath, updatedData, 'utf8')
    console.log(`成功替换文件中的内容！`)
  } catch (err) {
    console.error(`处理文件时发生错误：${err}`)
    throw err
  }
}

export const downloadFile = async (httpUrl: string, outputPath?: string): Promise<string> => {
  try {
    let parsedUrl = url.parse(httpUrl)
    let fileName = path.basename(parsedUrl.pathname as string)

    // 如果没有提供outputPath，则从URL中获取文件名
    if (!outputPath) {
      if (!fs.existsSync('.tmp')) {
        fs.mkdirSync('.tmp', { recursive: true })
      }
      outputPath = '.tmp/' + decodeURIComponent(fileName)
    }

    // 发起GET请求，并配置响应类型为stream
    const response = await axios({
      url: httpUrl,
      method: 'get',
      responseType: 'stream',
    })

    const writer = fs.createWriteStream(outputPath)
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(outputPath as string)) // 成功时返回文件路径
      writer.on('error', reject)
      writer.on('close', () => writer.end())
    })
  } catch (error: any) {
    console.error(`Error downloading the media: ${error?.message}`)
    throw error
  }
}
