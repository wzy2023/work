import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Profession } from '@/apis/entities'
import { Tech } from '@/apis/entities'

@Entity()
export class UserInfo extends BaseModel {
  @Column({ type: 'varchar' })
  openID!: string

  @Column({ type: 'varchar', nullable: true })
  unionID?: string

  @ManyToOne(() => Profession, { eager: true, nullable: true })
  @JoinColumn()
  profession?: Profession

  @ManyToMany(() => Tech, { eager: true, nullable: true, cascade: true })
  @JoinTable()
  techs?: Tech[]

  @Column({ type: 'timestamp', nullable: true })
  lastLoginTime?: Date

  @Column({ type: 'int', default: 0 })
  loginCount!: number
}
