<script lang="ts">
import { defineComponent } from 'vue'
import '../styles/index.css'
import axios from 'axios'

export default defineComponent({
  name: 'CodeAssistant',
  props: {
    sourceCode: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
      message: '',
      response: '',
      loading: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    async sendMessage() {
      this.loading = true

      try {
        const res = await axios.post('backend/api/llm', {
          // This is placeholder for now! Todo: replace with actual backend endpoint, use promises
          message: this.message,
          sourceCode: this.sourceCode,
        })
        this.response = res.data.message
      } catch (error) {
        console.error('Error communicating with LLM:', error)
      } finally {
        this.loading = false
      }
    },
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
        <p v-if="response">Response from LLM:</p>
        <p v-if="response" class="mock-response">{{ response }}</p>

        <div class="source-block">
          <p>Source code passed as prop:</p>
          <pre>{{ sourceCode }}</pre>
        </div>
      </div>
      <footer class="assistant-footer">
        <input v-model="message" placeholder="Enter your message..." :disabled="loading" />
        <button @click="sendMessage" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send' }}
        </button>
      </footer>
    </div>
  </div>
</template>
