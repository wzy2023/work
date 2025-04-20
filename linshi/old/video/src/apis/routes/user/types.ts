import { User } from '@/apis/entities'

export interface LoginData extends Pick<User, 'name' | 'password'> {
  remember?: boolean,
}
