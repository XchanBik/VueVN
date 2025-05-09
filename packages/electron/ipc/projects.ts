import * as fs from 'fs'
import * as path from 'path'
import { ipcMain, app } from 'electron'
  
const GAMES_DIR = path.join(app.getPath('userData'), 'games')

export function registerProjectsIpc() {
  ipcMain.handle('list-projects', async () => {
    const projects = []
    for (const dir of fs.readdirSync(GAMES_DIR)) {
      const configPath = path.join(GAMES_DIR, dir, 'config.json')
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        projects.push({ folder: dir, ...config })
      }
    }
    return projects
  })
  ipcMain.handle('create-project', async (event, projectName: string) => {  
    const folder = projectName.replace(/[^a-zA-Z0-9_-]/g, '_')
    const projectPath = path.join(GAMES_DIR, folder)
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath)
      fs.writeFileSync(
        path.join(projectPath, 'config.json'),
        JSON.stringify({ name: projectName }, null, 2)
      )
      return { success: true, folder, name: projectName }
    } else {
      return { success: false, error: 'Project already exists' }
    }
  })
}