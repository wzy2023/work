import type { ButtonItem } from '@prisma/client'

export enum ButtonsType {
  Command = 'command',
  Copy = 'copy',
}

declare global {
  export namespace Buttons {
    export type Item = ButtonItem;

    export import Type = ButtonsType
  }
}
