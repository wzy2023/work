import { pick } from 'lodash'

// url地址的query转为query对象
export const url2Params = (url = location.href) => {
  url = decodeURIComponent(url)
  let jsonList: { [key: string]: string } = {}
  if (url.indexOf('?') > -1) {
    let str = url.slice(url.indexOf('?') + 1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      jsonList[strs[i].split('=')[0]] = strs[i].split('=')[1] // 如果出现乱码的话，可以用decodeURI()进行解码
    }
  }
  return jsonList || {}
}

// 参数对象转换为url
export const params2Url = (params: { [key: string]: any }) => {
  let url = ''
  for (let k in params) {
    if (k) {
      url += `${k}=${params[k]}&`
    }
  }
  return url.substr(0, url.length - 1)
}

export const setUrlParams = (key: string, value: any, keepName: string) => {
  if (key === undefined || value === undefined) return

  // 给地址栏参数对象添加指定参数
  let allParams = url2Params()
  if (keepName) {
    allParams = pick(allParams, keepName) || {}
  }
  // @ts-ignore
  allParams[key] = encodeURIComponent(value)

  // 域名和路径
  const url = location.href
  const sliceEnd = url.indexOf('?') === -1 ? url.length : url.indexOf('?')
  const domainPath = url.slice(0, sliceEnd)

  // 参数
  const params = params2Url(allParams)

  // 修改地址栏url
  location.replace(`${domainPath}?${params}`)
}

export const urlGetPath = (url = location.href) => {
  // 计算要截取的最后一位
  let lastIndex = url.indexOf('?')
  if (lastIndex === -1) {
    lastIndex = url.length
  }

  return url.slice(0, lastIndex)
}
