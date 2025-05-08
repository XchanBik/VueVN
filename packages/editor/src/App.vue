<template>
  <div class="app">
    <header class="header">
      <h1>VUEVN Editor</h1>
      <BuildButton />
    </header>
    <main class="main">
      <div class="workspace">
        <!-- Project workspace will go here -->
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>

<style>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main {
  flex: 1;
  padding: 1rem;
  background: #A5D5F5;
}

.workspace {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 100%;
}

body, #app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style> 