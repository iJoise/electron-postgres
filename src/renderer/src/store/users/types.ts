import { User } from '@renderer/types/users'

export interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  authorizedUser: User | null
  authorizedLoading: boolean
  authorizedErrorMessage: null | string
  getUsers: () => Promise<void>
  addUser: (user: User) => Promise<void>
  loginUser: (login: string, password: string) => Promise<User | null>
  clearAuth: () => void
}
