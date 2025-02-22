import { axios } from '../axios'
import json5 from 'json5'

export const chat = async (message: string, model: string = 'o1-mini', isParse = true) => {
  try {
    let { data } = await axios({
      url: '/v1/chat/completions',
      method: 'post',
      data: {
        model,
        message,
      },
    })

    console.log(666, typeof data, data)

    const output = typeof data === 'string' ? json5.parse(data)?.output : data?.output

    if (isParse) {
      const match = /```(json)?(.*)```/s.exec(output)
      if (!match) {
        return json5.parse(output)
      } else {
        return json5.parse(match[2])
      }
    }

    return output

  } catch (error: any) {
    throw new Error(error?.response?.statusText || error?.message || '未知原因')
  }
}
