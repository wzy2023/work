import { prop } from '@typegoose/typegoose'

export default class Good {
  @prop()
  public step?: string

  @prop()
  public status?: string

  @prop()
  public create_time?: string

  @prop()
  public update_time?: string

  @prop()
  public base?: any

  @prop()
  public pan?: any

  @prop()
  public dou?: any

  @prop()
  public good?: any
}
