import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ChatSMSCode extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  smsId: number

  @Column('varchar')
  mobile: string

  @Column('varchar')
  code: string

  @Column('bigint')
  expDate: number

  @Column({ type: 'tinyint', default: 0 })
  used: number

  @Column('bigint')
  createAt: number
}
