import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { LotteryAsalysisPossibilities, LotteryType } from '@/apis/entities'
import { BaseModel } from '@/apis/utils/baseModel'
import { NumLists, NumListsInfo, RecommendTable, AsalysisInfo } from '@/apis/jobs/asalysis2/utils'

@Entity()
export class LotteryAsalysis extends BaseModel {
  @Column('varchar')
  name!: string

  @ManyToOne(type => LotteryType, { eager: true })
  @JoinColumn()
  lottery!: LotteryType

  @Column('json')
  numLists!: NumLists

  @Column('json')
  numListsInfo!: NumListsInfo

  @Column('json')
  info!: AsalysisInfo

  @Column('json')
  recommendTables!: RecommendTable[]

  @OneToMany(() => LotteryAsalysisPossibilities, possibilities => possibilities.lotteryAsalysis, {
    cascade: true,
    // eager: true, // 查询的时候会把这个关联字段也自动查询出来
  })
  possibilities!: LotteryAsalysisPossibilities[]
}
