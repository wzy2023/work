import { axios } from '../axios'

export const generateImage = async (prompt: string, base64Array?: string[]) => {
  try {
    const { data } = await axios({
      url: '/mj/submit/imagine',
      method: 'post',
      data: {
        prompt,
        base64Array,
        botType: 'MID_JOURNEY',
        notifyHook: '',
        state: '',
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

export const getImageStatus = async (taskId: string) => {
  try {
    const { data } = await axios({
      url: `/mj/task/${taskId}/fetch`,
      method: 'get',
    })

    return data
  } catch (error) {
    throw error
  }
}
