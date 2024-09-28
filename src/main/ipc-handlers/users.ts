import { ipcMain } from 'electron'
import { addUser, getUsers, loginUser } from '../services/userService'

export const setupUserHandlers = () => {
  ipcMain.handle('add-user', (_event, user) => {
    return addUser(user.login, user.fullName, user.password, user.role)
  })

  ipcMain.handle('get-users', () => {
    return getUsers()
  })

  ipcMain.handle('login-user', (_event, login: string, password: string) => {
    return loginUser(login, password)
  })
}
