import moment from 'moment'
import * as utils from './index'
import { Provide } from '@midwayjs/decorator'
import { getModelForClass } from '@typegoose/typegoose'

@Provide()
export default class Service {
  Model

  constructor(Model) {
    this.Model = getModelForClass(Model)
  }

  async list(where = {}, sort = {}) {
    return await this.Model.find(where).sort(sort).exec()
  }

  async create(data) {
    data.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
    return await this.Model.create(data)
  }

  async updateOne(_id, data) {
    // 判断内容是否有改动
    if (!utils.diffRecord(await this.findOne(_id), data)) {
      utils.addUpdateTime(data)
    }
    await this.Model.updateOne({ _id }, data).exec()
    return this.findOne(_id)
  }

  async deleteOne(_id) {
    return await this.Model.deleteOne({ _id }).exec()
  }

  async findOne(_id) {
    return typeof _id === 'string' ?
      await this.Model.findOne({ _id }).exec() :
      await this.Model.findOne(_id).exec()
  }
}
