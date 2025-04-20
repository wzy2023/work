import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from '@/apis/utils/baseModel'

@Entity()
export class LotteryRule extends BaseModel {
  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  content!: string // 表达式内容

  @Column({ type: 'tinyint' })
  size!: number // 规则的长度，例如：a+b+c+d = 4

  @Column({ type: 'varchar', nullable: true })
  remark?: string // 创建时的备注

  @Column({ type: 'tinyint' })
  minSize!: number // 最小需要的彩种长度，例如：3 代表需要彩种具有 3 个号码及以上时，才可以使用
}
