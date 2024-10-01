import { ResponseType } from '@renderer/types/common'
import { DepartmentsType, WorkersType } from '@renderer/types/workers'

export class WorkersService {
  static async updateWorkers(file): Promise<ResponseType<string>> {
    return await window.electron.ipcRenderer.invoke('upload-workers-file', file)
  }

  static async getAllWorkers(): Promise<ResponseType<WorkersType[]>> {
    return await window.electron.ipcRenderer.invoke('get-workers')
  }

  static async getAllDepartments(): Promise<ResponseType<DepartmentsType[]>> {
    return await window.electron.ipcRenderer.invoke('get-departments')
  }
}
