import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Project } from './Project'

export enum AccountLoginStatus {
  NotLoggedIn = 0,
  LoggedIn = 1,
  Scanned = 2,
  Failed = 3,
}

export enum AccountPlatform {
  DouYin = 'douYin',
  ShiPinHao = 'shiPinHao',
  XiaoHongShu = 'xiaoHongShu',
  KuaiShou = 'kuaiShou',
  TikTok = 'tikTok',
}

@Entity()
export class Account extends BaseModel {
  @Column({ type: 'varchar' })
  platform!: AccountPlatform

  @Column({ type: 'varchar' })
  userId!: string

  @Column({ type: 'varchar', default: AccountLoginStatus.NotLoggedIn })
  status!: AccountLoginStatus

  @Column({ type: 'json', nullable: true })
  headers?: any

  @Column({ type: 'varchar', nullable: true })
  name?: string

  @Column({ type: 'varchar', nullable: true })
  avatar?: string

  @Column({ type: 'int', nullable: true })
  works?: number

  @Column({ type: 'int', nullable: true })
  fans?: number

  @ManyToOne(type => Project, project => project.accounts)
  project!: Project
}
