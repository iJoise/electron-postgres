import { ResponseType } from '@renderer/types/common'
import { SettingsElementType, SettingsTableType } from '@renderer/types/settings'

export class SettingsService {
  static async insetSettings(params: {
    tableType: SettingsTableType
    element: SettingsElementType
  }): Promise<ResponseType<SettingsElementType>> {
    return await window.electron.ipcRenderer.invoke('insert-settings', params)
  }

  static async getAllSetting(
    tableType: SettingsTableType
  ): Promise<ResponseType<SettingsElementType[]>> {
    return await window.electron.ipcRenderer.invoke('get-settings', tableType)
  }

  static async deleteSetting(params: {
    tableType: SettingsTableType
    identifier: string | number
  }): Promise<ResponseType<SettingsElementType>> {
    return await window.electron.ipcRenderer.invoke('delete-settings', params)
  }
}
