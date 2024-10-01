import { ipcMain } from 'electron'
import { getAllDepartments, getAllWorkers, processWorkersFile } from '../services/workerService'

export const setupWorkerHandlers = () => {
  ipcMain.handle('upload-workers-file', async (_event, filePath) => {
    try {
      await processWorkersFile(filePath)
      return { success: true, data: 'Список успешно загружен. Созданы таблицы с данными' }
    } catch (error) {
      console.error('Ошибка при загрузке и обработке файла:', error)
      return { success: false, error: `Ошибка при загрузке и обработке файла: ${error}` }
    }
  })

  ipcMain.handle('get-workers', async () => {
    return await getAllWorkers()
  })

  ipcMain.handle('get-departments', async () => {
    return await getAllDepartments()
  })
}
