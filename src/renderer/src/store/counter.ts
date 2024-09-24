import { create } from 'zustand'

interface User {
  id?: number
  login: string
  fullName: string
  role: string
  password: string
}

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  getUsers: () => Promise<void>
  addUser: (user: User) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true, error: null })
    try {
      const users = await window.electron.ipcRenderer.invoke('get-users')
      set({ users, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false })
    }
  },

  addUser: async (user: User) => {
    try {
      const response = await window.electron.ipcRenderer.invoke('add-user', user)

      if (response.success) {
        set((state) => ({ users: [...state.users, user] }))
      }
    } catch (error) {
      set({ error: 'Failed to add user', loading: false })
    }
  }
}))
