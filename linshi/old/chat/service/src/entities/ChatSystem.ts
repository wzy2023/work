import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ChatSystem extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  type: string

  @Column('json')
  value: Record<string, any>

  @Column({ type: 'bigint' })
  createAt: number

  @Column('bigint')
  updateAt: number
}
