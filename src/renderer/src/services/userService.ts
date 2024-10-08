import { ResponseType } from '@renderer/types/common'
import { User } from '@renderer/types/users'

export class UserService {
  static async getUsers(): Promise<User[]> {
    return await window.electron.ipcRenderer.invoke('get-users')
  }

  static async addUser(user: Omit<User, 'id'>): Promise<ResponseType<User>> {
    return await window.electron.ipcRenderer.invoke('add-user', user)
  }

  static async loginUser(login: string, password: string): Promise<ResponseType<User>> {
    return await window.electron.ipcRenderer.invoke('login-user', login, password)
  }

  static async deleteUser(id: number): Promise<ResponseType<User>> {
    return await window.electron.ipcRenderer.invoke('delete-user', id)
  }
}
