import { uploadImage, sbumit, calculateProgress } from './utils'
import { axios } from './axios'

export { setCookie } from './utils'

export const getVideoStatus = async (taskId: string) => {
  if (!taskId) {
    return
  }
  try {
    const response = await axios.get('https://klingai.kuaishou.com/api/task/status', {
      params: { taskId },
    })

    return {
      status: response.data?.data?.status,
      url: response.data?.data?.works?.[0]?.resource?.resource,
      cover: response.data?.data?.works?.[0]?.cover?.resource,
      progress: calculateProgress(response.data?.data) * 100,
    }
  } catch (error) {
    console.error('获取 status 失败:', error)
    throw error
  }
}

export const generateVideo = async (imageUrl: string, prompt?: string) => {
  const uploadedUrl = await uploadImage(imageUrl)
  console.log('图片上传成功，URL:', uploadedUrl)

  const taskId = await sbumit(uploadedUrl, prompt)
  console.log(666, '任务 id', taskId)

  return taskId
}
