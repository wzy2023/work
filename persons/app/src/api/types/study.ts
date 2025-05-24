import type { StudyOperate } from '@prisma/client'

export enum StudyContentType {
  Text = 'text',
  Url = 'url',
  Html = 'html',
  Json = 'json',
}

export enum StudyViewType {
  Text = 'text',
  Iframe = 'iframe',
  Html = 'html',
  Render = 'render',
}

declare global {
  export namespace Study {
    export type Operate = StudyOperate

    export import ContentType = StudyContentType
    export import ViewType = StudyViewType

    export type CreateValues = Pick<StudyOperate, 'name' | 'contentType' | 'viewType' | 'input' | 'output' | 'model' | 'prompt'>
  }
}
