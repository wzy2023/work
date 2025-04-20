const fs = require('fs')
const path = require('path')

// 获取指定目录下的目录和文件
const getDirsAndFiles = (path_) => {
  const files = fs.readdirSync(path_)
  return {
    dirs: files.filter(item => !fs.statSync(path.resolve(path_, item)).isFile()),
    files: files.filter(item => fs.statSync(path.resolve(path_, item)).isFile()),
  }
}

// 处理名称 1.Html => {index: 1, name: 'Html', sourceName: '1.Html'}
const getIndexName = (name, index) => {
  if (!name || !(/^\d*\./.test(name))) {
    return {
      index,
      name,
      sourceName: name,
    }
  }
  return {
    index: Number(name.split('.')[0]),
    name: name.split('.')[1],
    sourceName: name,
  }
}

// 根据名称的前缀序号排序 ['1.Html', '5.Git', '2.Css'] => ['1.Html', '2.Css', '5.Git']
const sortNames = (names) => {
  const names_ = names.map(getIndexName)
  return names_.sort((a, b) => a.index - b.index).map(item => item.sourceName) || []
}

// 生成文件router
const generateFileRouter = (item, topPath) => ({
  path: encodeURI(`${topPath}/${item}`),
  name: getIndexName(item).name,
  component: `.${topPath}/${item}`,
})

module.exports = {
  getDirsAndFiles,
  getIndexName,
  sortNames,
  generateFileRouter,
}
