import { User } from '@renderer/types/users'

export interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  authorizedUser: User | null
  authorizedLoading: boolean
  authorizedErrorMessage: null | string
  getUsers: () => Promise<void>
  addUser: (user: Omit<User, 'id'>) => Promise<User | null>
  loginUser: (login: string, password: string) => Promise<User | null>
  deleteUser: (id: number) => void
  clearAuth: () => void
}
