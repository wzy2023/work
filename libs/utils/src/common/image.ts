import axios from 'axios'

export async function imageToBase64(url: string) {
  try {
    // 使用axios发送GET请求获取图片
    const response = await axios.get(url, {
      responseType: 'arraybuffer', // 设置响应类型为arraybuffer
    })

    // 将二进制数据转换为Base64编码，并加上 MIME 类型前缀
    const base64String = Buffer.from(response.data).toString('base64')
    return `data:image/*;base64,${base64String}`

  } catch (error) {
    console.error('Failed to fetch the image:', error)
    throw error
  }
}
