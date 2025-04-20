import { Column, Entity } from 'typeorm'
import { BaseModel } from '@/apis/utils'

export enum NeedJobSource {
  Cxykz = '程序员客栈',
  Jjzb = '匠迹众包',
  Yjs = '猿急送',
  Ms = '码市',
  Dy = '电鸭',
  Sx = '实现',
  Xmf = '小蜜蜂',
  Txgc = '甜馨工场',
  Yg = '云工',
}

export enum NeedJobType {
  Need = 'need',
  Job = 'job',
}

@Entity()
export class NeedJob extends BaseModel {
  @Column('varchar')
  type!: NeedJobSource

  @Column('varchar')
  source!: NeedJobType

  @Column('varchar')
  title!: string

  @Column({ type: 'varchar', length: 10000, nullable: true, charset: 'utf8mb4' })
  desc?: string

  @Column({ type: 'varchar', nullable: true })
  url?: string

  @Column({ type: 'varchar', nullable: true })
  price?: string

  @Column({ type: 'int', nullable: true })
  applyNum?: number

  @Column({ type: 'timestamp', nullable: true }) // 发布时间
  createTime!: number

  @Column({ type: 'boolean', nullable: true })
  confirmed?: boolean
}
