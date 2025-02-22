import { sendRequest } from './utils'

export const generateImage = async (prompt?: string) => {
  const url = 'https://www.midjourney.com/api/app/submit-jobs'

  const method = 'POST'

  const data: any = {
    'f': {
      'mode': 'fast',
      'private': false,
    },
    'channelId': 'singleplayer_f96c46bd-cf6b-4e61-a335-0c0517311a79',
    'roomId': null,
    'metadata': {
      'isMobile': null,
      'imagePrompts': 0,
      'imageReferences': 0,
      'characterReferences': 0,
      'depthReferences': 0,
      'lightboxOpen': null,
    },
    't': 'imagine',
    prompt: prompt?.replaceAll('"', '\"'),
  }

  try {
    const res: any = await sendRequest({
      url,
      method,
      data,
    })
    console.log(666, res)
    return JSON.parse(res)

  } catch (err) {
    console.log(666, err)
  }
}
