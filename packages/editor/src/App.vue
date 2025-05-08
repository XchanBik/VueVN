<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-700">
    <header class="bg-slate-800 text-white px-8 py-4 flex items-center justify-between shadow">
      <div class="flex items-center gap-3">
        <span class="text-4xl">✨</span>
        <h1 class="text-3xl font-bold tracking-wide">VUEVN Editor</h1>
      </div>
      <button
        class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded transition"
        @click="setPage('new')"
      >
        New Project
      </button>
    </header>
    <main class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="w-full max-w-3xl bg-white/90 rounded-xl shadow-lg p-10 min-h-[50vh] flex flex-col items-center justify-center">
        <template v-if="page === 'welcome'">
          <h2 class="text-2xl font-semibold mb-2 text-slate-800">Welcome to VUEVN!</h2>
          <p class="text-gray-500 mb-6 text-center">Create, edit, and export your Visual Novel projects with ease.</p>
          <button
            class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded transition"
            @click="setPage('new')"
          >
            Start a New Project
          </button>
        </template>
        <template v-else-if="page === 'new'">
          <h2 class="text-xl font-bold mb-4 text-slate-700">[Project Canvas Placeholder]</h2>
          <p class="text-gray-400">This is where your editor/canvas will go.</p>
          <button
            class="mt-8 text-sky-500 hover:underline"
            @click="setPage('welcome')"
          >
            ← Back to Welcome
          </button>
        </template>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref<'welcome' | 'new'>('welcome')
function setPage(p: 'welcome' | 'new') {
  page.value = p
}
</script>

<!-- No custom CSS needed, all handled by Tailwind --> 
<style>
body {
  margin: 0;
}
</style>
