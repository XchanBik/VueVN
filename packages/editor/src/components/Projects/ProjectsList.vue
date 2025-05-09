<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-white">Your Projects</h1>
      <button
        @click="showNewProjectModal = true"
        class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <span class="text-xl">+</span>
        <span>New Project</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="appStore.isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="appStore.error" class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
      {{ appStore.error }}
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in appStore.projects"
        :key="project.id"
        class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/70 transition-colors cursor-pointer"
        @click="appStore.setCurrentProject(project)"
      >
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold text-white">{{ project.name }}</h2>
          <span class="text-sky-400 text-sm">{{ project.config.version }}</span>
        </div>
        <div class="space-y-2 text-slate-400">
          <p class="text-sm">
            <span class="text-slate-500">Author:</span> {{ project.config.author }}
          </p>
          <p class="text-sm">
            <span class="text-slate-500">Last saved:</span> {{ formatDate(project.lastSaved) }}
          </p>
        </div>
      </div>
    </div>

    <!-- New Project Modal -->
    <div v-if="showNewProjectModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div class="bg-slate-800 rounded-xl p-6 w-full max-w-md">
        <h2 class="text-xl font-bold text-white mb-4">Create New Project</h2>
        <input
          v-model="newProjectName"
          type="text"
          placeholder="Project Name"
          class="w-full bg-slate-700 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <div class="flex justify-end gap-3">
          <button
            @click="showNewProjectModal = false"
            class="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createProject"
            class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
            :disabled="!newProjectName.trim()"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app_data'

const appStore = useAppStore()
const showNewProjectModal = ref(false)
const newProjectName = ref('')

onMounted(() => {
  appStore.loadProjects()
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function createProject() {
  if (!newProjectName.value.trim()) return
  await appStore.createNewProject(newProjectName.value.trim())
  showNewProjectModal.value = false
  newProjectName.value = ''
}
</script>
