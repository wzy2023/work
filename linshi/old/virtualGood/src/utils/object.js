const watch = {
  observe(obj, key, watchFun) {

    // 给该属性设默认值
    let val = obj[key]

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
  setWatcher(data = {}, watch = {}) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]) // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
}

const get = {
  getCookies(name = '') {

  },
  getQuery(url = location.href, name = '') {

  },
}

const find = {
  // 在数据里找指定字段
  findAttr: (variable, attr, curPath) => {
    const getType = (variable) => {
      return Object.prototype.toString.call(variable).slice(8, -1)
    }

    const isJson = (str) => {
      try {
        if (getType(JSON.parse(str)) === 'Object') {
          return true
        }
      } catch (e) {
      }
      return false
    }

    if (isJson(variable)) {
      variable = JSON.parse(variable)
      curPath += '.toString()'
    }

    if (getType(variable) === 'Array') {
      for (let index = 0; index < variable.length; index++) {
        const res = findAttr(variable[index], attr, curPath + `[${index}]`)
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
        const res = find.findAttr(variable[key], attr, curPath + `.${key}`)
        if (res) {
          return res
        }
      }
    }
  },

  // 判断是否有包含指定属性的对象，第三个参数可以指定具体的值
  checkAttr: (list = [], attr = '', value) => {
    return list.some((item) => value === undefined ? item[attr] : item[attr] === value)
  },
}

const filter = {
  // 过滤对象中为undefined的属性
  filterParams: (params) => {
    return Object.entries(params || {}).reduce((obj, [key, value]) => {
      if (value !== undefined) {
        obj[key] = value
      }
      return obj
    }, {})
  },
}

export default {
  ...watch,
  ...get,
  ...find,
}
