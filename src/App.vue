<script lang="ts">
import { defineComponent } from 'vue'
import CodeAssistant from './components/CodeAssistant.vue'

export default defineComponent({
  name: 'App',
  components: { CodeAssistant },
  data() {
    return {
      sourceCode: 'random',
    }
  },
})
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-items">
        <div class="nav-item">🏠</div>
        <div class="nav-item">📁</div>
        <div class="nav-item">🧩</div>
        <div class="nav-item">📊</div>

        <div class="nav-item">
          <CodeAssistant :sourceCode="sourceCode" />
        </div>
      </div>
    </nav>

    <main class="main-content">
      <h1>Welcome to Priscilla LLM</h1>
      <p>This is a mock navbar + AI assistant example.</p>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  gap: 20px;
}

.nav-items {
  display: flex;
  gap: 16px;
}

.nav-item {
  background: #e5e5e5;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
