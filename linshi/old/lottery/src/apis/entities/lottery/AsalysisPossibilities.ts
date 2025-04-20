import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils/baseModel'
import { Hot } from '@/apis/jobs/asalysis2/utils'
import { LotteryAsalysis } from './Asalysis'

export interface Index {
  nums: number[],
  index: number,
  indexDifference: number,
}

@Entity()
export class LotteryAsalysisPossibilities extends BaseModel {
  @Column('json')
  group!: number[][]

  @Column('float')
  probability!: number

  @Column('float')
  probabilityNum!: number

  @Column('json', { nullable: true })
  prevIndexs!: Index[]

  @Column('json', { nullable: true })
  nextIndexs!: Index[]

  @Column('json', { nullable: true })
  hots!: {
    current: Hot[],
    slice: Hot[],
  }[]

  @ManyToOne(() => LotteryAsalysis, lotteryAsalysis => lotteryAsalysis.possibilities)
  lotteryAsalysis?: LotteryAsalysis
}
