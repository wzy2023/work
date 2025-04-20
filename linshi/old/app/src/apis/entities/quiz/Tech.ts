import { Column, Entity } from 'typeorm'
import { BaseModel } from '@/apis/utils'

export enum TechCategory {
  Language = 'Language',
  Framework = 'Framework',
  Library = 'Library',
  Tool = 'Tool'
}

@Entity()
export class Tech extends BaseModel {
  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar' })
  icon!: string

  @Column({ type: 'varchar' })
  category!: TechCategory
}
