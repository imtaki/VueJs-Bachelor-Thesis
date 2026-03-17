<script lang="ts">
import { defineComponent } from 'vue'
import './styles/index.css'

export default defineComponent({
  name: 'App',
  data() {
    return {
      sourceCode: `function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}`,
    }
  },
})
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-items">
        <div class="nav-item">
          <PriscillaAI xpath="//textarea[@id='code-block']" :chapterId="12" :programId="589" />
        </div>
      </div>
    </nav>

    <main class="main-content">
      <h1>Welcome to Priscilla LLM</h1>
      <p>This is a mock navbar + AI assistant example with code hint capability.</p>

      <section class="code-section">
        <h2>Code Example</h2>
        <textarea
          id="code-block"
          v-model="sourceCode"
          class="code-editor"
          spellcheck="false"
        ></textarea>
        <p><small>Click the 🤖 icon in the navbar to get a hint about this code!</small></p>
      </section>
    </main>
  </div>
</template>
