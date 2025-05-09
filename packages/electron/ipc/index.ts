import * as fs from 'fs'
import * as path from 'path'
import { ipcMain, app } from 'electron'
import { registerProjectsIpc } from './projects'
import { registerCharactersIpc } from './characters'

// ...import other handler modules
const GAMES_DIR = path.join(app.getPath('userData'), 'games')

function ensureGamesDir() {
    if (!fs.existsSync(GAMES_DIR)) {
      fs.mkdirSync(GAMES_DIR, { recursive: true })
    }
}

function registerPingIpc() {
    ipcMain.handle('ping', async () => {
      return 'pong from Electron main process!'
    })
}

export function registerAllIpc() {
  ensureGamesDir() 
  registerPingIpc()
  registerProjectsIpc()
  registerCharactersIpc()
  // ...call other handler registration functions
}