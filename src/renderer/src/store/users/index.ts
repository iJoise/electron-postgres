import { ErrorsMessages } from '@renderer/enums'
import { UserService } from '@renderer/services/userService'
import { User } from '@renderer/types/users'
import { create } from 'zustand'
import { UserState } from './types'

const user = import.meta.env.DEV
  ? {
      id: 6,
      login: '123',
      fullname: 'Default Admin',
      password: '',
      role: 'super-admin'
    }
  : null

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,
  authorizedUser: user,
  authorizedLoading: false,
  authorizedErrorMessage: null,

  getUsers: async () => {
    set({ loading: true, error: null })
    try {
      const users = await UserService.getUsers()
      set({ users, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false })
    }
  },

  addUser: async (user: User) => {
    try {
      const response = await UserService.addUser(user)

      if (response.success) {
        set((state) => ({ users: [...state.users, user] }))
      }
    } catch (error) {
      set({ error: 'Failed to add user', loading: false })
    }
  },

  loginUser: async (login: string, password: string) => {
    set({ authorizedLoading: true, authorizedErrorMessage: null })
    try {
      const response = await UserService.loginUser(login, password)

      if (response.success) {
        const user = response.data

        set({ authorizedUser: user, authorizedLoading: false })

        return user
      } else {
        set({ authorizedErrorMessage: response.error, authorizedLoading: false })
        return null
      }
    } catch (error) {
      set({ authorizedErrorMessage: ErrorsMessages.UNEXPECTED, authorizedLoading: false })
      return null
    }
  },

  clearAuth: () => set({ authorizedUser: null })
}))
