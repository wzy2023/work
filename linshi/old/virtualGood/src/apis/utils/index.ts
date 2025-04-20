import moment from 'moment'

export const diffRecord = (record, data) => {
  data = JSON.parse(JSON.stringify(data)) // 注意:不能用_.cloneDeep()
  record = JSON.parse(JSON.stringify(record))
  delete record._id
  return JSON.stringify(record).trim() === JSON.stringify(data).trim()
}

export const addUpdateTime = (data) => {
  data.update_time = moment().format('YYYY-MM-DD HH:mm:ss')
  return data
}

export const delay = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
