import { contextBridge, app } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Low } from 'lowdb'
import * as path from 'node:path'
import { JSONFile } from 'lowdb/node'

// Описываем тип данных для lowdb
interface Data {
  users: { id: number; name: string }[]
}

// Получаем путь к папке для пользовательских данных
const userDataPath = app.getPath('userData')

// Путь к файлу базы данных
const dbFilePath = path.join(userDataPath, 'db.json')

// Создаем адаптер для файла базы данных
const adapter = new JSONFile<Data>(dbFilePath)

// Передаем адаптер и начальные данные (например, пустой массив пользователей)
const db = new Low<Data>(adapter, { users: [] })

async function initializeDb() {
  await db.read()
  // Если данных нет, инициализируем пустую структуру
  db.data ||= { users: [] }
  await db.write()
}

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

module.exports = { db, initializeDb }
