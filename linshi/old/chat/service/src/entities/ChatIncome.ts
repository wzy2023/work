import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ChatUser } from './ChatUser'

@Entity()
export class ChatIncome extends BaseEntity {
  @PrimaryGeneratedColumn()
  incomeId: number

  @ManyToOne(type => ChatUser)
  @JoinColumn()
  inviter: ChatUser // 邀请人

  @ManyToOne(type => ChatUser)
  @JoinColumn()
  invitee: ChatUser // 被邀请人

  @Column({ type: 'float', default: 0 })
  price: number // 被邀请人的充值

  @Column({ type: 'float', default: 0 })
  income: number // 邀请人的收益

  @Column({ type: 'bigint' })
  createAt: number
}
