import type { AiRole, AiInfo } from '@prisma/client'

declare global {
  export namespace Ai {
    export type Role = AiRole
    export type Info = AiInfo
  }
}
