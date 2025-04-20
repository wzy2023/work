const _getData = () => {
  const localDataStr = localStorage.getItem('localData')
  return JSON.parse(localDataStr) || {}
}

const _setItem = (key, data) => {
  let localData = _getData()
  localData[key] = data
  localStorage.setItem('localData', JSON.stringify(localData))
}

const _getItem = (key, defaultValue) => {
  return _getData()[key] || defaultValue
}

const _update = (name, fn) => {
  let list = _getItem(name, [])
  list = fn(list)
  _setItem(name, list)
}

// const findItem = (name, _id) => {
//   const data = _getItem(name, [])
//   return data.find((_item) => _item._id === _id)
// }

export default (name) => {
  return () => ({
    get() {
      return _getItem(name, [])
    },
    delete(index) {
      _update(name, (list) => {
        list.splice(index, 1)
        return list
      })
    },
    edit(index, data) {
      _update(name, (list) => {
        list[index] = {
          ...list[index],
          ...data,
        }
        return list
      })
    },
    add(data) {
      _update(name, (list) => {
        data._id = Date.now()
        list.push(data)
        return list
      })
    },
    copy(index) {
      _update(name, (list) => {
        let data = { ...list[index] }
        data._id = Date.now()
        list.splice(index, 0, data)
        return list
      })
    },
  })
}
