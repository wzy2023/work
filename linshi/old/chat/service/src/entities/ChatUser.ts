import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ChatUser extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  uuid: string

  @Column('varchar')
  mobile: string

  @Column({ type: 'varchar', nullable: true })
  openid?: string

  @Column({ type: 'int', default: 0 })
  count: number

  @Column({ type: 'int', default: 0 })
  useCount: number

  @Column({ type: 'float', default: 0 })
  payPrice: number

  @Column({ type: 'json', nullable: true })
  wx?: {
    openid?: string
    nickname?: string
    headimgurl?: string
    unionid?: string
  }

  @Column({ type: 'tinyint', default: 1 })
  status: number // 1: normal, 2: disabled, 3: deleted

  @Column({ type: 'int', default: 1 })
  role: number // 1: normal, 2: promoter, 999: admin

  @Column({ type: 'float', default: 0 })
  income: number

  @Column('bigint')
  createAt: number

  @Column('bigint')
  updateAt: number
}
