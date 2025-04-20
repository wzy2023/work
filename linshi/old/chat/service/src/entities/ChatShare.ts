import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ChatUser } from './ChatUser'

@Entity()
export class ChatShare extends BaseEntity {
  @PrimaryGeneratedColumn()
  shareId: number

  @ManyToOne(type => ChatUser)
  @JoinColumn()
  inviter: ChatUser // 邀请人

  @OneToOne(type => ChatUser)
  @JoinColumn()
  invitee: ChatUser // 被邀请人

  @Column('int')
  num: number // 邀请人获得的数量

  @Column({ type: 'bigint' })
  createAt: number
}
