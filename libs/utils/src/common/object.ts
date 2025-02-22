import { getType, isJson } from './string';

// 判断是否有包含指定属性的对象，第三个参数可以指定具体的值
export const findItem = <I>(list: I[], attr: keyof I, value?: I[keyof I]): I | undefined => {
  return list.find((item) => value === undefined ? item[attr] : item[attr] === value)
}

// 在数据里深入找指定字段
const findAttr = (variable: any, attr: string, curPath: string) => {
  if (isJson(variable)) {
    variable = JSON.parse(variable)
    curPath += '.toString()'
  }

  if (getType(variable) === 'Array') {
    for (let index = 0; index < variable.length; index++) {
      const res: any = findAttr(variable[index], attr, curPath + `[${index}]`)
      if (res) {
        return res
      }
    }
  }

  if (getType(variable) === 'Object') {
    if (variable[attr] !== undefined) {
      return curPath + '.' + attr
    }

    for (let key in variable) {
      const res: any = findAttr(variable[key], attr, curPath + `.${key}`)
      if (res) {
        return res
      }
    }
  }
}

// 过滤对象中为undefined的属性
export const filterParams = (params: { [key: string]: any }) => {
  return Object.entries(params || {}).reduce((obj, [key, value]) => {
    if (value !== undefined) {
      obj[key] = value
    }
    return obj
  }, {} as any)
}

// 监听属性
export const watch = {
  observe(obj: { [key: string]: any }, key: string, watchFun: (value: any, val: any) => undefined) {

    // 给该属性设默认值
    const val = obj[key]

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set(value) {
        obj[key] = value
        // 赋值(set)时，调用对应函数
        watchFun(value, val)
      },
      get() {
        return val
      },
    })
  },
  setWatcher(data = {}, watch = {} as any) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]) // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
}
