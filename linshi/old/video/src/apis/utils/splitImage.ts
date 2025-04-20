import { axios } from '@wzyjs/utils'
import { Image } from 'image-js'

export async function splitImage(imageUrl: string): Promise<Buffer[]> {
  try {
    // 下载图片
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const imageBuffer = Buffer.from(response.data, 'binary')

    // 加载图片
    const image = await Image.load(imageBuffer)

    const width = image.width
    const height = image.height

    if (!width || !height) {
      throw new Error('无法获取图片尺寸')
    }

    // 计算每个子图片的尺寸
    const halfWidth = Math.floor(width / 2)
    const halfHeight = Math.floor(height / 2)

    const croppedBuffers: Buffer[] = []

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const left = col * halfWidth
        const top = row * halfHeight

        // 调整最后一列和最后一行，确保不超出边界
        const currentWidth = (col === 1) ? width - left : halfWidth
        const currentHeight = (row === 1) ? height - top : halfHeight

        // 裁剪子图片
        const croppedImage = image.crop({ x: left, y: top, width: currentWidth, height: currentHeight })

        // 将裁剪后的图片转换为 PNG Buffer
        const croppedBuffer = Buffer.from(await croppedImage.toBuffer('image/png' as any))

        croppedBuffers.push(croppedBuffer)
      }
    }

    return croppedBuffers
  } catch (error) {
    console.error('分割图片时出错:', error)
    throw error
  }
}
