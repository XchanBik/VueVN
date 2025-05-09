import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { registerAllIpc } from './ipc'
import Store from 'electron-store'

// Initialize store for project data
const store = new Store()

function createWindow() {
  console.log('Process arguments:', process.argv);
  console.log('__dirname:', __dirname);

  // Detect dev mode from process arguments
  const isDev = process.argv.includes('--Dev');
  
  console.log('Preload path:', path.join(__dirname, 'preload.js'))

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // path to your built preload script
    }
  })
  // In development, load from Vite dev server
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '/../../dist-app/index.html'))
  }

  // 👇 Hides the menu bar completely
  mainWindow.setMenuBarVisibility(false);

  // 👇 Optionally disables Alt key menu toggle (Windows/Linux only)
  mainWindow.setAutoHideMenuBar(true);
}

app.whenReady().then(() => {
  registerAllIpc()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 