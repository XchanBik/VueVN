<template>
  <aside 
    class="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 transition-all duration-300"
    :class="isExpanded ? 'w-64' : 'w-16'"
  >
    <div class="p-4 flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center gap-3 mb-8">
        <span class="text-3xl">✨</span>
        <h1 class="text-xl font-bold tracking-wide" v-show="isExpanded">VueVN</h1>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-2">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          :class="{ 'bg-slate-700/50': item.active }"
          @click="selectItem(item.id)"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span v-show="isExpanded">{{ item.label }}</span>
        </button>
      </nav>

      <!-- Toggle button -->
      <button 
        @click="toggleSidebar"
        class="mt-auto p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
      >
        <span class="text-xl">{{ isExpanded ? '◀' : '▶' }}</span>
      </button>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isExpanded = ref(true)

const navItems = [
  { id: 1, icon: '📁', label: 'Projects', active: true },
  { id: 2, icon: '⚙️', label: 'Settings', active: false },
  { id: 3, icon: '📚', label: 'Templates', active: false },
  { id: 4, icon: '❓', label: 'Help', active: false },
]

function toggleSidebar() {
  isExpanded.value = !isExpanded.value
}

function selectItem(id: number) {
  navItems.forEach(item => {
    item.active = item.id === id
  })
}
</script> 