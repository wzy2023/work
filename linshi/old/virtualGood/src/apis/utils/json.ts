// 实现一个文件系统读写数据库
const fs = require('fs')
const path = require('path')

const jsonFile = path.resolve(__dirname, '../config/config.json')

// 读数据
export function get(key) {
  return new Promise((resolve) => {
    fs.readFile(jsonFile, (err, data) => {
      const json = data ? JSON.parse(data) : {}
      resolve(json[key])
    })
  })
}

// 写数据，文件不存在自动创建
export function set(key, value = '') {
  fs.readFile(jsonFile, { encoding: 'utf-8' }, (err, data) => {
    const json = data ? JSON.parse(data || '{}') : {}
    json[key] = value
    fs.writeFile(jsonFile, JSON.stringify(json), () => {
    })
  })
}
