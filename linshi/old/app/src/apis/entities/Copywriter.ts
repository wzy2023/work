import { Column, Entity } from 'typeorm'
import { BaseModel } from '@/apis/utils'

@Entity()
export class Copywriter extends BaseModel {
  @Column('text')
  text!: string
}
