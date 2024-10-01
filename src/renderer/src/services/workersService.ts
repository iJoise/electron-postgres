import { ResponseType } from '@renderer/types/common'

export class WorkersService {
  static async updateWorkers(file): Promise<ResponseType<string>> {
    return await window.electron.ipcRenderer.invoke('upload-workers-file', file)
  }
}
