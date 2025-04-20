import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils/baseModel'
import { LotteryType } from '@/apis/entities'
import { AsalysisInfo } from '@/apis/jobs/asalysis2/utils'

@Entity()
export class LotteryAsalysisLine extends BaseModel {
  @Column('json')
  data!: any

  @Column('json')
  info!: AsalysisInfo

  @ManyToOne(type => LotteryType)
  @JoinColumn()
  lottery!: LotteryType
}
