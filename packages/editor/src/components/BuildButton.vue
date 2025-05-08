<template>
  <div class="build-button">
    <button 
      @click="buildGame" 
      :disabled="isBuilding"
      class="build-btn"
    >
      {{ isBuilding ? 'Building...' : 'Build Game' }}
    </button>
    <div v-if="buildStatus" class="build-status">
      {{ buildStatus }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ipcRenderer } from 'electron'

export default defineComponent({
  name: 'BuildButton',
  setup() {
    const isBuilding = ref(false)
    const buildStatus = ref('')

    const buildGame = async () => {
      try {
        isBuilding.value = true
        buildStatus.value = 'Building your game...'
        
        // Get current project data from store
        const projectData = await ipcRenderer.invoke('get-project-data')
        
        // Trigger build
        const outputPath = await ipcRenderer.invoke('build-game', projectData)
        
        buildStatus.value = `Build complete! Output: ${outputPath}`
      } catch (error) {
        buildStatus.value = `Build failed: ${error instanceof Error ? error.message : String(error)}`
      } finally {
        isBuilding.value = false
      }
    }

    return {
      isBuilding,
      buildStatus,
      buildGame
    }
  }
})
</script>

<style scoped>
.build-button {
  padding: 1rem;
}

.build-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.build-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.build-status {
  margin-top: 0.5rem;
  color: #666;
}
</style> 