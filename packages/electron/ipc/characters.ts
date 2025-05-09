import * as fs from 'fs'
import * as path from 'path'
import { ipcMain, app } from 'electron'
  
export function registerCharactersIpc() {
  ipcMain.handle('list-characters', async () => {
    // ...same as before
  })
  ipcMain.handle('create-character', async (event, characterName: string) => {
    // ...same as before
  })
}