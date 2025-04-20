import { Entity, Column, OneToMany } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Prompt } from './Prompt'
import { Work } from './Work'
import { Material } from './Material'
import { Account } from './Account'

@Entity()
export class Project extends BaseModel {
  @Column({ type: 'varchar', nullable: true })
  name?: string

  // 一个 Project 对多个 Prompt
  @OneToMany(type => Prompt, prompt => prompt.project)
  prompts?: Prompt[]

  // 一个 Project 对多个 Work
  @OneToMany(type => Work, work => work.project)
  works?: Work[]

  // 一个 Project 对多个 Material
  @OneToMany(() => Material, material => material.project)
  materials?: Material[]

  // 一个 Project 对多个 Account
  @OneToMany(() => Account, account => account.project)
  accounts?: Account[]
}
