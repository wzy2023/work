import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { QuestionAttr } from './QuestionAttr'

// 帮我按下面的格式，生成 3 条 js 的题目，要 json 格式
// 其中，attr 和 enabled 不用生成

export enum QuestionType {
  // SingleChoice 的可选项应该为 4 个，answers 应该只有 1 个
  SingleChoice = 'SingleChoice',
  // MultipleChoice 的可选项应该为 4 个，answers 可以有多个
  MultipleChoice = 'MultipleChoice',
  // TrueFalse 的选项应该为 2 个，且为 “正确” | “错误”，answers 应该只有 1 个
  TrueFalse = 'TrueFalse'
}

export enum QuestionLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export interface QuestionOptions {
  [key: string]: {
    // 选项内容
    content: string

    // 用户选择这个答案时，给用户的提示
    // 如果用户点了正确的选项，要肯定用户的选择，并解释应该这么选的原因，并给出一些扩展介绍
    // 如果用户选择了错误的答案，要委婉的表达用户选错了，并告知原因，提示用户应该如何思考
    tip: string
  }
}

@Entity()
export class Question extends BaseModel {
  @ManyToOne(() => QuestionAttr, questionAttr => questionAttr.questions)
  @JoinColumn()
  attr!: QuestionAttr

  // 题目内容 (中文)
  @Column({ type: 'varchar' })
  content!: string

  // 题目类型
  @Column({ type: 'varchar' })
  type!: QuestionType

  // 题目选项 (中文)
  @Column({ type: 'json' })
  options!: QuestionOptions

  // 是选项列表的key
  @Column({ type: 'json' })
  answer!: string[]

  // 题目难度
  @Column({ type: 'varchar', nullable: true })
  level?: QuestionLevel

  // 题目考察点描述 (中文，不能涉及到答案)
  @Column({ type: 'varchar', nullable: true })
  pointText?: string

  // 题目考察点关键词 (中文)
  @Column({ type: 'json', nullable: true })
  point?: string[]

  // 题目解析 (中文，引导用户思考)
  @Column({ type: 'varchar', nullable: true })
  asalysis?: string

  // 题目技巧 (中文，如何记住这类题)
  @Column({ type: 'varchar', nullable: true })
  technique?: string

  @Column({ type: 'boolean', default: true })
  enabled!: boolean
}
