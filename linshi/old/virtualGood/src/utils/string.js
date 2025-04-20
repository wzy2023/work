import utils from '@/utils/index'

const format = {
  // 金钱格式化，每三位加,
  amount(str) {
    const reg = /(?=(?!\b)(\d{3})+$)/g
    return str.replace(reg, ',')
  },

  // 保留指定位数的小数
  limitDecimals(value, num = 2, isForce = false) {
    value = parseFloat(value)
    if (isNaN(value)) {
      if (isForce) {
        value = 0
      } else {
        return ''
      }
    }
    return value.toFixed(num).toString()
  },

  // 字符串转为js对象，不限于json字符串，'{a: 1}'也能转
  str2Object(str = '') {
    return JSON.parse(eval(`JSON.stringify(${replace.replaceByRules(str, [['\\n', '']])})`))
  },
}

const reg = {
  // 是否为url
  isUrl() {

  },
}

const get = {
  // 获取变量的类型
  getType: (value) => {
    return Object.prototype.toString.call(value).slice(8, -1)
  },

  // 将变量转为字符串
  toString: (value) => {
    return Object.prototype.toString.call(value).slice(8, -1) === 'object' ? JSON.stringify(value) : String(value)
  },

  // 生成随机颜色
  getRandomColor: () => {
    const color = Math.floor(Math.random() * 16777215).toString(16)
    if (color.length === 6) {
      return color
    } else {
      return get.getRandomColor()
    }
  },

  // 生成随机字符串
  getRandomString: (length = 4) => {
    return Math.random().toString(36).substr(2, length)
  },

  // 将config转换为连接mongo的url
  getMongoUrl: (config) => {
    return `mongodb://${config.username}:${config.password}@${config.host[0]},${config.host[1]}/${config.db}?replicaSet=${config.replicaset}`
  },

  // 获取指定cookie
  getCookie: (name) => {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    return arr ? unescape(arr[2]) : null
  },

  // 获取字符串内的中文
  getChinese: (str) => {
    if (str !== null && str !== '') {
      const reg = /[\u4e00-\u9fa5]/g
      return str.match(reg).join('')
    }
    return ''
  },

  // 截取文本中间的字符串 (不好用)
  getSliceStr: (str, before, after) => {
    return str.slice(str.indexOf(before) + before.length, str.lastIndexOf(after))
  },

  // 获取代理后的url
  getProxyUrl: (url) => {
    const beforeUrl = 'https://1141871752167714.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/a.LATEST/proxy/?url='
    return beforeUrl + url
  },

  // 获取字符串的长度
  getLength: (value) => {
    const chineseLength = utils.getChinese(value).length
    return (value.length - chineseLength) + chineseLength * 2
  },
}

const replace = {
  // 根据规则替换字符串
  replaceByRules: (text = '', rules = []) => {
    rules.forEach(([a, b]) => {
      text = text.replaceAll(a, b)
    })
    return text
  },
}

export default {
  ...format,
  ...reg,
  ...get,
  ...replace,
}
