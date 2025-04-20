import Good from '../../entity/good'
import Service from '../../utils/Service'

export const list = async (where) => {
  const s = new Service(Good)
  return { success: true, msg: '成功', data: await s.list(where, { create_time: -1 }) }
}

export const find = async (_id) => {
  const s = new Service(Good)
  return { success: true, msg: '成功', data: await s.findOne(_id) }
}

export const create = async (data) => {
  const s = new Service(Good)
  return { success: true, msg: '成功', data: await s.create(data) }
}

export const del = async (_id) => {
  const s = new Service(Good)
  return { success: true, msg: '成功', data: await s.deleteOne(_id) }
}

export const update = async (_id, data) => {
  delete data._id
  const s = new Service(Good)
  return { success: true, msg: '成功', data: await s.updateOne(_id, data) }
}

export const updateAttr = async (_id, updateData = {}) => {
  const s = new Service(Good)

  let record = await s.findOne(_id)
  // 这里不太好
  if (record.$__) {
    record = record.$__
  }

  return { success: true, msg: '成功', data: await s.updateOne(_id, { ...record, ...updateData }) }
}
