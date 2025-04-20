import fs from 'fs'
import axios from 'axios'

const writeFile = (name, dataBuffer) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, dataBuffer, function(err) {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

export const send = async (platform, record) => {

  const base64 = record.good[platform].image_master.imgBase64.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = new Buffer(base64, 'base64')
  const name = `D:/1.ProJect/3.react/5.virtual_good/src/cache/${record.good[platform].name}.png`
  await writeFile(name, dataBuffer)
  record.good[platform].image_master.fileUrl = name

  delete record.dou
  delete record.good[platform].image_master.imgBase64

  const res = await axios.post(`http://127.0.0.1:81`, {
    data: {
      platform,
      record,
    },
    responseType: 'text',
  })

  return { success: true, msg: '发布拼多多成功', data: res.data }
}
