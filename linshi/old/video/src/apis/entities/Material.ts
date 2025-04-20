import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from '@/apis/utils'
import { Project } from './Project'

export enum MaterialStatus {
  Done = 'done',
  Doing = 'doing',
  Failed = 'failed',
}

export enum MaterialType {
  GROUP = 'group',
  TEXT = 'text',
  PROMPT = 'prompt',
  IMAGECREATE = 'imageCreate',
  IMAGE = 'image',
  VIDEO = 'video',
  VIDEOHANDLE = 'videoHandle',
}

export enum MaterialSourceType {
  Import = 'import',
  Generate = 'generate',
  Handle = 'handle',
}

export interface GroupData {
  title: string;
  description?: string;
}

export interface TextData {
  content: string;
  model?: string;
  sourceType: MaterialSourceType;
}

export interface PromptData {
  en?: string;
  zh?: string;
  model?: string;
  urls?: string[];
  prompt: string;
  text: string;
  sourceType: MaterialSourceType;
}

export interface ImageCreateData {
  prompt: string;
  model?: 'midjourney';
  urls?: string[];
  url?: string; // 参考图
  taskId?: string;
  sourceType: MaterialSourceType;
}

export interface ImageData {
  url: string;
  sourceType: MaterialSourceType;
  prompt?: string;
}

export interface VideoData {
  url?: string;
  cover?: string;
  taskId?: string,
  model?: 'keling',
  prompt?: string;
  imageUrl: string;
  sourceType: MaterialSourceType;
}

export interface VideoHandleData {
  url?: string;
  sourceUrl: string;
  sourceImageUrl: string;
  sourceType: MaterialSourceType;
  mode?: 0 | 1 | 2
}

export type MaterialData<T> = T extends MaterialType.GROUP ? GroupData :
  T extends MaterialType.TEXT ? TextData :
    T extends MaterialType.PROMPT ? PromptData :
      T extends MaterialType.IMAGE ? ImageData :
        T extends MaterialType.IMAGECREATE ? ImageCreateData :
          T extends MaterialType.VIDEO ? VideoData :
            T extends MaterialType.VIDEOHANDLE ? VideoHandleData : never

@Entity()
export class Material extends BaseModel {
  @Column({
    type: 'enum',
    enum: MaterialType,
  })
  type!: MaterialType

  @Column({
    type: 'enum',
    enum: MaterialStatus,
    default: MaterialStatus.Done,
  })
  status!: MaterialStatus

  @Column({ type: 'varchar', nullable: true })
  failReason?: string

  @Column({ type: 'int', nullable: true })
  progress?: number

  @Column({ type: 'int', nullable: true })
  order?: number

  @Column('json', { nullable: true })
  data!: GroupData | TextData | PromptData | ImageData | VideoData | VideoHandleData

  // 定义子节点关系
  @OneToMany(() => Material, material => material.parent, { cascade: true, orphanedRowAction: 'delete' })
  children?: Material[]

  // 定义父节点关系
  @ManyToOne(() => Material, material => material.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Material

  // 是否收藏
  @Column({ type: 'boolean', default: false })
  isFavorite!: boolean

  // 是否隐藏
  @Column({ type: 'boolean', default: false })
  isHidden!: boolean

  @ManyToOne(() => Project, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project
}
