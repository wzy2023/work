import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Project } from './Project'

@Entity()
export class Prompt extends BaseModel {
  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'text' })
  content!: string

  @Column({ type: 'boolean', default: false })
  showInMenu!: boolean

  @Column({ type: 'json', nullable: true })
  columns!: any[]

  @ManyToOne(type => Project, project => project.prompts)
  project!: Project
}
