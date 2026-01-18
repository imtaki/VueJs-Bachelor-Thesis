<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CodeAssistant',
  props: {
    sourceCode: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const isOpen = ref(false)

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    return { isOpen, toggle, props }
  },
})
</script>

<template>
  <div class="code-assistant">
    <button class="assistant-button" @click="toggle">
      <span v-if="!isOpen">❓</span>
      <span v-else>✖️</span>
    </button>

    <div v-if="isOpen" class="assistant-window">
      <header class="assistant-header">Priscilla LLM</header>
      <div class="assistant-body">
        <p><strong>Response from LLM:</strong></p>
        <p class="mock-response">This is a placeholder AI response.</p>

        <div class="source-block">
          <p><strong>Source code passed as prop:</strong></p>
          <pre>{{ props.sourceCode }}</pre>
        </div>
      </div>
      <footer class="assistant-footer">
        <input placeholder="Enter your message..." />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.code-assistant {
  position: relative;
}

.assistant-button {
  background: #e5e5e5;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
}

.assistant-window {
  position: absolute;
  top: 50px;
  right: 0;
  width: 300px;
  height: 400px;
  background: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.assistant-header {
  background: #464767;
  color: white;
  padding: 10px;
  font-weight: bold;
  text-align: center;
}

.assistant-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.source-block {
  background: #efefef;
  padding: 6px;
  margin-top: 10px;
  font-family: monospace;
  font-size: 12px;
}

.assistant-footer {
  border-top: 1px solid #ccc;
  padding: 10px;
}

.assistant-footer input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
