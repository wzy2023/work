import { Column, Entity } from 'typeorm'
import { BaseModel } from '@/apis/utils'

@Entity()
export class TaskLog extends BaseModel {
  @Column('json')
  categorize!: string[]

  @Column('float')
  duration!: number

  @Column({ type: 'double', nullable: true })
  dateTime?: number
}
