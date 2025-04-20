import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ChatUser } from './ChatUser'
import type { OrderStatus, Sku } from '../types'

@Entity()
export class ChatOrder extends BaseEntity {
  @PrimaryColumn('varchar')
  orderId: string

  @ManyToOne(type => ChatUser)
  @JoinColumn()
  user: ChatUser

  @Column('json')
  sku: Sku

  @Column('varchar')
  status: OrderStatus

  @Column('varchar')
  wxPayUrl: string

  @Column('bigint')
  createAt: number

  @Column({ type: 'bigint', nullable: true })
  payAt?: number

  @Column({ type: 'bigint', nullable: true })
  updateAt?: number
}
