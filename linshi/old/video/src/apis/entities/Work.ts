import { Column, Entity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Project } from './Project'
import { Material } from './Material'
import { Release } from './Release'

export enum WorkPublishStatus {
  Draft = 'draft',
  Published = 'published',
  Rejected = 'rejected',
}

@Entity()
export class Work extends BaseModel {
  @Column({ type: 'varchar', nullable: true })
  text?: string

  @Column({ type: 'varchar', nullable: true })
  title?: string

  @Column({ type: 'varchar', nullable: true })
  desc?: string

  @Column({ type: 'json', nullable: true })
  comments?: string[]

  @ManyToOne(type => Project, project => project.works)
  project!: Project

  @Column({ type: 'varchar', default: WorkPublishStatus.Draft })
  status!: WorkPublishStatus

  @ManyToMany(() => Material)
  @JoinTable()
  content!: Material[]

  @OneToMany(() => Release, submit => submit.work, { cascade: true })
  release!: Release[]
}
