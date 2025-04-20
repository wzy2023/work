import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Work } from './Work'
import { Project } from './Project'
import { AccountPlatform } from './Account'

export enum ReleaseStatus {
  Success = 'success',
  Fail = 'fail',
  PartialSuccess = 'partialSuccess',
}

@Entity()
export class Release extends BaseModel {
  @Column({ type: 'enum', enum: ReleaseStatus })
  status!: ReleaseStatus

  @ManyToOne(() => Work, work => work.release)
  work!: Work

  @ManyToOne(() => Project, project => project.works)
  project!: Project

  @Column({ type: 'json' })
  results!: {
    platform: AccountPlatform
    status: ReleaseStatus
    reason?: string
  }[]
}
