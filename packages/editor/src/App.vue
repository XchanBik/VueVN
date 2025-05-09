<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex">
    <Sidebar />
    <main class="flex-1 p-8 overflow-auto">
      <Content class="content" v-if="appStore.currentProject !== undefined" />
      <ProjectsList class="content" v-else />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Content from '@/components/Content.vue'
import ProjectsList from '@/components/Projects/ProjectsList.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useAppStore } from '@/stores/app_data'

const appStore = useAppStore()
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Custom scrollbar for modern browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
