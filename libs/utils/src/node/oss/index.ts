import OSS from 'ali-oss'
import axios from 'axios'
import fs from 'fs-extra'
import * as path from 'path'

// 初始化 OSS 实例
const oss = new OSS({
  region: process.env.VITE_OSS_REGION!,
  accessKeyId: process.env.VITE_OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.VITE_OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.VITE_OSS_BUCKET!,
})

// 定义支持的文件输入类型
type FileInput = string | Buffer

/**
 * 上传文件到 OSS
 * @param file - 文件，可以是 HTTP URL、本地文件路径或 Buffer
 * @param filename - 文件名，当 file 是 Buffer 时必须提供
 * @returns 上传后的文件 URL
 */
export async function uploadFile(file: FileInput, filename?: string): Promise<string> {
  let buffer: Buffer
  let finalFilename: string

  if (typeof file === 'string') {
    if (/^https?:\/\//.test(file)) {
      // 处理 HTTP URL
      try {
        const response = await axios.get<ArrayBuffer>(file, { responseType: 'arraybuffer' })
        buffer = Buffer.from(response.data)
      } catch (error) {
        throw new Error(`无法从 URL 下载文件: ${error}`)
      }
      const originalName = path.basename(new URL(file).pathname)
      const ext = path.extname(originalName)
      const nameWithoutExt = path.basename(originalName, ext)
      finalFilename = `${nameWithoutExt}_${Date.now()}${ext}`
    } else {
      // 处理本地文件路径
      try {
        buffer = fs.readFileSync(file)
      } catch (error) {
        throw new Error(`无法读取文件路径: ${error}`)
      }
      const originalName = path.basename(file)
      const ext = path.extname(originalName)
      const nameWithoutExt = path.basename(originalName, ext)
      finalFilename = `${nameWithoutExt}_${Date.now()}${ext}`
    }
  } else if (Buffer.isBuffer(file)) {
    if (!filename) {
      throw new Error('当文件为 Buffer 时，必须提供文件名')
    }
    buffer = file
    finalFilename = filename
  } else {
    throw new Error('不支持的文件类型')
  }

  try {
    const result = await oss.put(decodeURIComponent(finalFilename), buffer, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable', // 设置缓存时间为365天
      },
    })
    return result.url
  } catch (error) {
    throw new Error(`上传到 OSS 失败: ${error}`)
  }
}
