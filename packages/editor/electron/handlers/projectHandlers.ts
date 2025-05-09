import { ipcMain } from 'electron'
import * as path from 'path'
import * as fs from 'fs/promises'

const PROJECTS_DIR = path.join(process.cwd(), 'projects')

async function ensureProjectsDir() {
  try {
    await fs.access(PROJECTS_DIR)
  } catch {
    await fs.mkdir(PROJECTS_DIR, { recursive: true })
  }
}

export function setupProjectHandlers() {
  // Get all projects
  ipcMain.handle('get-projects', async () => {
    await ensureProjectsDir()
    const projects = []
    
    try {
      const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true })
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const configPath = path.join(PROJECTS_DIR, entry.name, 'config.json')
          try {
            const configContent = await fs.readFile(configPath, 'utf-8')
            const config = JSON.parse(configContent)
            const stats = await fs.stat(configPath)
            
            projects.push({
              id: entry.name,
              name: config.title || entry.name,
              lastSaved: stats.mtime.toISOString(),
              config: {
                title: config.title || entry.name,
                author: config.author || 'Unknown',
                version: config.version || '1.0.0'
              }
            })
          } catch (err) {
            console.error(`Error reading project ${entry.name}:`, err)
          }
        }
      }
    } catch (err) {
      console.error('Error reading projects directory:', err)
      throw new Error('Failed to read projects')
    }
    
    return projects
  })

  // Create new project
  ipcMain.handle('create-project', async (_, { name }) => {
    await ensureProjectsDir()
    
    const projectId = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const projectDir = path.join(PROJECTS_DIR, projectId)
    
    try {
      await fs.mkdir(projectDir, { recursive: true })
      
      const config = {
        title: name,
        author: 'Unknown',
        version: '1.0.0',
        created: new Date().toISOString()
      }
      
      await fs.writeFile(
        path.join(projectDir, 'config.json'),
        JSON.stringify(config, null, 2)
      )
      
      return {
        id: projectId,
        name: config.title,
        lastSaved: new Date().toISOString(),
        config
      }
    } catch (err) {
      console.error('Error creating project:', err)
      throw new Error('Failed to create project')
    }
  })
} 