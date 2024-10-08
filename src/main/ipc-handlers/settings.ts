import { ipcMain } from 'electron'
import {
  createTableAndInsertData,
  deleteElement,
  getAllElements
} from '../services/settingsService'

export const setupSettingsHandlers = () => {
  ipcMain.handle(
    'insert-settings',
    async (_event, params: { tableType: string; element: { number: string; mileage: number } }) => {
      return createTableAndInsertData(params.tableType, params.element)
    }
  )

  ipcMain.handle('get-settings', async (_event, tableType: string) => {
    return await getAllElements(tableType)
  })

  ipcMain.handle(
    'delete-settings',
    async (_event, params: { tableType: string; identifier: string | number }) => {
      return await deleteElement(params.tableType, params.identifier)
    }
  )
}
