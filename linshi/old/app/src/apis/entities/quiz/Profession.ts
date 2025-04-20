import { Column, Entity, ManyToMany, JoinTable } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Tech } from './Tech'

@Entity()
export class Profession extends BaseModel {
  @Column({ type: 'varchar', nullable: true })
  name?: string

  @Column({ type: 'varchar' })
  desc!: string

  @Column({ type: 'varchar' })
  icon!: string

  @ManyToMany(() => Tech)
  @JoinTable()
  techs!: Tech[]

  @ManyToMany(() => Tech)
  @JoinTable()
  essentialTechs!: Tech[]
}
