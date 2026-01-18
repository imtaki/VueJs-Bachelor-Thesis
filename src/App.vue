<script lang="ts">
import { defineComponent } from 'vue'
import './styles/index.css'

export default defineComponent({
  name: 'App',
  data() {
    return {
      sourceCode: '1',
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
