import type { Collecting as CollectingModel } from '@prisma/client'

export enum CollectingType {
  Url = 'url',
  Prompt = 'prompt',
  Copy = 'copywriter',
}

declare global {
  export namespace Collecting {
    export type Item = CollectingModel;

    export import Type = CollectingType
  }
}
