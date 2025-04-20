import { axios, sendMail } from '@wzyjs/utils/node'
import { toEmail, loginInfo } from './config'
import { options } from './utils'

const getUserList = async () => {
  try {
    const response = await axios.get('https://www.proginn.com/cat/')
    const { data } = response

    return data.match(/userid="(.*?)" title="(.*?)"/g)

  } catch (error) {
    return error
  }
}

const login = async (): Promise<string> => {
  return 'x_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIzMzE0MTUiLCJjdGltZSI6MTcyNjEzMDU2MSwiZXhwIjoxNzI4NzIyNTYxfQ.LOF1BbV4GJFNF8VBmGLaiAPkxvpMLokWOxceZwR_tvM'
  // try {
  //   const data = `login_name=${loginInfo.name}&password=${loginInfo.password}`
  //   const response = await axios.post('https://www.proginn.com/api/passport/login', data, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   })
  //   console.log(666, 'success', response.data)
  //
  //   return `x_access_token=${response.data.data.access_token}`
  //
  // } catch (error) {
  //   console.log(666, 'error', error)
  //   return JSON.stringify(error)
  // }
}

export const ping = async () => {
  try {
    const cookie = await login()
    const response = await axios.post('https://www.proginn.com/api/remote/ping', null, options(cookie))

    const res = response.data.info.includes('成功') ? '成功' : '失败'
    const content = JSON.stringify(response.data)

    await sendMail(toEmail, `[通知][程序员客栈]-ping${res}`, content)
    return `[ping${res}]-${content}`

  } catch (error) {
    return error
  }
}

export const openOrClose = async (work_status: -1 | 1) => {
  try {
    const response = await axios.post('https://www.proginn.com/ajax/saveUserInfo', { work_status }, options())

    const status = work_status === 1 ? '开启' : '关闭'
    const res = response.data.info.includes('成功') ? '成功' : '失败'
    const content = JSON.stringify(response.data)

    await sendMail(toEmail, `[通知][程序员客栈]-${status}接单${res}`, content)
    return `[${status}接单${res}]-${content}}`

  } catch (error) {
    return error
  }
}
