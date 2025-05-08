import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export class BuildService {
  private projectPath: string
  private outputPath: string

  constructor(projectPath: string) {
    this.projectPath = projectPath
    this.outputPath = path.join(projectPath, 'dist')
  }

  async buildGame(projectData: any): Promise<string> {
    try {
      // Create temporary project directory
      const tempDir = path.join(this.projectPath, '.temp-build')
      await fs.promises.mkdir(tempDir, { recursive: true })

      // Write project data to JSON
      await fs.promises.writeFile(
        path.join(tempDir, 'project.json'),
        JSON.stringify(projectData, null, 2)
      )

      // Generate Vue app using the engine
      const enginePath = path.join(__dirname, '../../engine/dist/index.js')
      await execAsync(`node ${enginePath} build ${tempDir} ${this.outputPath}`)

      // Clean up
      await fs.promises.rm(tempDir, { recursive: true })

      return this.outputPath
    } catch (error) {
      console.error('Build failed:', error)
      throw error
    }
  }
}

// Set up IPC handlers
export function setupBuildHandlers() {
  ipcMain.handle('build-game', async (event, projectData) => {
    const buildService = new BuildService(process.cwd())
    return await buildService.buildGame(projectData)
  })
} 