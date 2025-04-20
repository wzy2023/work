import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ChatUser } from './ChatUser'

@Entity()
export class ChatPoint extends BaseEntity {
  @PrimaryGeneratedColumn()
  pointId: string

  @ManyToOne(type => ChatUser, { nullable: true })
  @JoinColumn()
  user?: ChatUser

  @Column('varchar')
  pointType: 'click' | 'view'

  @Column('varchar')
  pointName: string

  @Column({ type: 'varchar', nullable: true })
  pointDesc?: string

  @Column('varchar')
  pageUrl: string

  @Column('json')
  userAgent: Record<string, any>

  @Column({ type: 'json', nullable: true })
  extraData?: any

  @Column('bigint')
  createAt: number
}
