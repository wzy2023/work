import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { ChatUser } from './ChatUser'
import { Talk } from '../types'

@Entity()
export class ChatTalk extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  chatId: number

  @Column('varchar')
  uuid: string

  @ManyToOne(type => ChatUser)
  @JoinColumn()
  user: ChatUser

  @Column('json')
  talks: Talk[]

  @Column('bigint')
  createAt: number

  @Column('bigint')
  updateAt: number
}
