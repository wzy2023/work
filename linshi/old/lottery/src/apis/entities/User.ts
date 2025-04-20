import { Column, Entity } from 'typeorm'
import { BaseModel } from '@/apis/utils/baseModel'

export enum UserStatus {
  Normal = 1,
  Disabled = 2,
}

export enum UserRole {
  Normal = 1,
  Admin = 999,
}

@Entity()
export class User extends BaseModel {
  @Column('varchar')
  name!: string

  @Column('varchar')
  password!: string

  @Column({ type: 'varchar', nullable: true })
  mobile?: string

  @Column({ type: 'json', nullable: true })
  wx?: {
    openid?: string
    nickname?: string
    headimgurl?: string
    unionid?: string
  }
}
