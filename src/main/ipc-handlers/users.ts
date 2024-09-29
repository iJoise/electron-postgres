import { ipcMain } from 'electron'
import { addUser, getUsers, loginUser } from '../services/userService'

export const setupUserHandlers = () => {
  ipcMain.handle('add-user', async (_event, user) => {
    return await addUser(user.login, user.fullName, user.password, user.role)
  })

  ipcMain.handle('get-users', async () => {
    return await getUsers()
  })

  ipcMain.handle('login-user', async (_event, login: string, password: string) => {
    return await loginUser(login, password)
  })
}
