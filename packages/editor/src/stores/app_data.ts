import { defineStore } from 'pinia'

interface Project {
  id: string
  name: string
  lastSaved: string
  config: {
    title: string
    author: string
    version: string
  }
}

export const useAppStore = defineStore('app', {
  state: () => ({
    currentProject: null as Project | null,
    projects: [] as Project[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async loadProjects() {
      this.isLoading = true
      try {
        // @ts-ignore - window.electron is injected by preload
        const projects = await window.electron.ipcRenderer.invoke('get-projects')
        this.projects = projects
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load projects'
      } finally {
        this.isLoading = false
      }
    },

    async createNewProject(name: string) {
      try {
        // @ts-ignore - window.electron is injected by preload
        const project = await window.electron.ipcRenderer.invoke('create-project', { name })
        this.projects.push(project)
        this.currentProject = project
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to create project'
      }
    },

    setCurrentProject(project: Project | null) {
      this.currentProject = project
    }
  }
})