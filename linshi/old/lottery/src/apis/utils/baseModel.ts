import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ type: 'timestamp' }) // 创建时间
  createdAt!: number

  @UpdateDateColumn({ type: 'timestamp' }) // 更新时间
  updatedAt!: number

  @Column({ type: 'tinyint', default: 0 }) // 软删除标志
  isDeleted!: number
}
