import { app, session } from 'electron'
import { join } from 'node:path'
import os from 'node:os'

export const setupDevtools = () => {
  const reactDevToolsPath = join(
    os.homedir(),
    '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/5.3.1_0'
  )

  app.whenReady().then(async () => {
    await session.defaultSession.loadExtension(reactDevToolsPath)
  })
}
