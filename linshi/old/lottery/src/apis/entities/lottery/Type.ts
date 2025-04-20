import { Column, Entity } from 'typeorm'
import { BaseModel } from '@/apis/utils/baseModel'

@Entity()
export class LotteryType extends BaseModel {
  @Column('varchar')
  name!: string

  @Column('varchar')
  code!: string

  @Column('tinyint')
  size!: number // 号码数量

  @Column({ type: 'json', nullable: true })
  range!: [number, number] // 取值范围

  @Column({ type: 'json', nullable: true })
  timeRange!: number[] // 开彩时间

  @Column('int')
  gapMinute!: number // 开彩间隔

  @Column('int')
  isSort!: boolean // 号码是否排序
}
