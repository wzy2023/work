import * as url from 'url'
import * as path from 'path'
import { axios } from './axios'
import { downloadImageWithCurl } from '../midjourney/utils'

const getToken = async (filename: string) => {
  try {
    const response = await axios.get('https://klingai.kuaishou.com/api/upload/issue/token', {
      params: { filename },
    })
    return response.data.data.token
  } catch (error) {
    console.error('获取 token 失败:', error)
    throw error
  }
}

const uploadFragment = async (uploadToken: string, imageBuffer: any) => {
  try {
    const response = await axios.post('https://upload.kuaishouzt.com/api/upload/fragment', imageBuffer, {
      params: {
        upload_token: uploadToken,
        fragment_id: 0,
      },
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
    return response.data
  } catch (error) {
    console.error('上传片段失败:', error)
    throw error
  }
}

const completeUpload = async (uploadToken: string) => {
  try {
    const response = await axios.post('https://upload.kuaishouzt.com/api/upload/complete', null, {
      params: {
        upload_token: uploadToken,
        fragment_count: 1,
      },
    })
    return response.data
  } catch (error) {
    console.error('完成上传失败:', error)
    throw error
  }
}

const verifyUpload = async (token: string) => {
  try {
    const response = await axios.get('https://klingai.kuaishou.com/api/upload/verify/token', {
      params: { token },
    })
    if (response.data?.result === 1 && response.data?.data?.status === 3) {
      return response.data.data?.url
    } else {
      throw new Error(`上传验证失败: ${response.data.message}`)
    }
  } catch (error) {
    console.error('获取上传结果失败:', error)
    throw error
  }
}

// const downloadImage = async (imageUrl: string) => {
//   try {
//     const response = await axios.get(imageUrl, {
//       responseType: 'arraybuffer',
//     })
//     return Buffer.from(response.data, 'binary')
//   } catch (error) {
//     console.error('下载图片失败:', error)
//     throw error
//   }
// }

export const uploadImage = async (imageUrl: string) => {
  try {
    // 解析图片 URL 以获取文件名
    const parsedUrl = url.parse(imageUrl)
    if (!parsedUrl.pathname) {
      return
    }

    const filename = path.basename(parsedUrl.pathname)

    // 下载图片并获取二进制数据
    const imageBuffer = await downloadImageWithCurl(imageUrl)

    // 获取上传 token
    const token = await getToken(filename)

    // 上传图片片段
    await uploadFragment(token, imageBuffer)

    // 完成上传
    await completeUpload(token)

    return await verifyUpload(token)
  } catch (error) {
    console.error('上传图片失败:', error)
    throw error
  }
}

export const sbumit = async (imageUrl: string, prompt?: string) => {
  try {
    var data = JSON.stringify({
      'arguments': [
        {
          'name': 'prompt',
          'value': prompt || '',
        },
        {
          'name': 'negative_prompt',
          'value': '闪烁、动画、模糊、变形、毁容、低质量、拼贴、颗粒状、抽象、计算机生成、扭曲',
        },
        {
          'name': 'cfg',
          'value': '0.5',
        },
        {
          'name': 'duration',
          'value': '5',
        },
        {
          'name': 'imageCount',
          'value': '1',
        },
        {
          'name': 'kling_version',
          'value': '1.5',
        },
        {
          'name': 'tail_image_enabled',
          'value': 'false',
        },
        {
          'name': 'camera_json',
          'value': '{"type":"empty","horizontal":0,"vertical":0,"zoom":0,"tilt":0,"pan":0,"roll":0}',
        },
        {
          'name': 'camera_control_enabled',
          'value': 'false',
        },
        {
          'name': 'biz',
          'value': 'klingai',
        },
      ],
      'inputs': [
        {
          'inputType': 'URL',
          'url': imageUrl,
          'name': 'input',
        },
      ],
      'type': 'm2v_img2video_hq',
    })
    const response = await axios({
      method: 'POST',
      url: 'https://klingai.kuaishou.com/api/task/submit',
      data,
    })
    return response.data?.data?.task?.id
  } catch (error) {
    console.error('完成上传失败:', error)
    throw error
  }
}

export const calculateProgress = (taskData: any) => {
  // 提取时间戳
  const createTime = taskData?.task?.createTime
  const etaTime = taskData?.etaTime
  const currentTime = Date.now() // 当前时间

  if (!createTime || !etaTime) {
    return 0
  }

  // 计算总的时间跨度和已经过去的时间
  const totalTimeSpan = etaTime - createTime
  const timeElapsed = currentTime - createTime

  // 防止除以零的情况
  if (totalTimeSpan <= 0) {
    return 0
  }

  // 计算进度比例
  let progressRatio = timeElapsed / totalTimeSpan

  // 确保进度不超过 0.99
  if (progressRatio >= 1) {
    progressRatio = 0.99
  }

  return progressRatio
}

export const setCookie = (newCookieValue: string) => {
  axios.defaults.headers.Cookie = newCookieValue
}
