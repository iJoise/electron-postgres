import { ipcMain } from 'electron'
import { processWorkersFile } from '../services/workerService'

export const setupWorkerHandlers = () => {
  ipcMain.handle('upload-workers-file', async (_event, filePath) => {
    try {
      await processWorkersFile(filePath)
      return { success: true, data: 'Список успешно загружен' }
    } catch (error) {
      console.error('Ошибка при загрузке и обработке файла:', error)
      return { success: false, error }
    }
  })
}
