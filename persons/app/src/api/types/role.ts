import type { AiRole } from '@prisma/client'

declare global {
  export namespace AiRole {
    export type Item = AiRole
  }
}
