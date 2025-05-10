import type { User } from '@prisma/client'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

declare global {
  export namespace Auth {
    export type UserData = User
    export import Role = UserRole

    export interface Session {
      user: UserData | null
      expires: string
    }
  }
}
