import { Column, Entity, OneToMany, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Tech } from './Tech'
import { Profession } from './Profession'
import { Question } from './Question'

export enum QuestionAttrCategory {
  Tech = 'Tech',
  Interview = 'Interview'
}

@Entity()
export class QuestionAttr extends BaseModel {
  @Column({ type: 'varchar' })
  category!: QuestionAttrCategory

  @ManyToOne(() => Tech, { nullable: true, eager: true })
  tech?: Tech

  @ManyToOne(() => Profession, { nullable: true, eager: true })
  profession?: Profession

  @Column({ type: 'varchar' })
  source!: string

  @OneToMany(() => Question, question => question.attr, { eager: true, cascade: true })
  questions!: Question[]
}
