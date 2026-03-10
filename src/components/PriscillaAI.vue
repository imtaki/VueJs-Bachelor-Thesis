<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { getPriscillaAIEndpoint } from '@/plugins/priscillaAI'
import '../styles/index.css'

interface PriscillaAIResponse {
  hint: string
}

export default defineComponent({
  name: 'PriscillaAI',
  props: {
    xpath: {
      type: String,
      required: true,
    },
    chapterId: {
      type: Number,
      required: true,
    },
    programId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      loading: false,
      hint: '',
      error: '',
      extractedContent: '',
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },

    extractCodeFromXPath(): string | null {
      try {
        const result = document.evaluate(
          this.xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        )

        const node = result.singleNodeValue as HTMLTextAreaElement | HTMLElement | null
        if (node) {
          if (node instanceof HTMLTextAreaElement) {
            return node.value
          }

          return node.textContent || null
        }
        return null
      } catch (err) {
        console.error('Error evaluating XPath:', err)
        this.error = 'Failed to extract code from the specified XPath'
        return null
      }
    },

    async fetchHint() {
      this.loading = true
      this.error = ''
      this.hint = ''

      try {
        const content = this.extractCodeFromXPath()

        if (!content) {
          this.error = 'Could not extract code from the specified element'
          this.loading = false
          return
        }

        this.extractedContent = content

        const endpoint = getPriscillaAIEndpoint()

        if (!endpoint) {
          this.error = 'API endpoint not configured. Please initialize the plugin with an endpoint.'
          this.loading = false
          return
        }

        const response = await axios.post<PriscillaAIResponse>(endpoint, {
          content: content,
          chapterId: this.chapterId,
          programId: this.programId,
        })

        this.hint = response.data.hint || 'No hint available'
      } catch (err) {
        console.error('Error fetching hint:', err)
        if (axios.isAxiosError(err)) {
          this.error = `API Error: ${err.response?.status || 'Unknown'} - ${err.message}`
        } else {
          this.error = 'An unexpected error occurred while fetching the hint'
        }
      } finally {
        this.loading = false
      }
    },

    clearHint() {
      this.hint = ''
      this.extractedContent = ''
      this.error = ''
    },
  },
})
</script>

<template>
  <div class="priscilla-ai">
    <button class="assistant-button" @click="toggle" :title="`XPath: ${xpath}`">
      <span v-if="!isOpen">🤖</span>
      <span v-else>✖️</span>
    </button>

    <div v-if="isOpen" class="assistant-window">
      <header class="assistant-header">Priscilla AI - Code Hint Assistant</header>
      <div class="assistant-body">
        <div v-if="extractedContent" class="extracted-content">
          <p><strong>Extracted Code:</strong></p>
          <pre class="code-block">{{ extractedContent }}</pre>
        </div>

        <div v-if="hint" class="hint-section">
          <p><strong>💡 Hint:</strong></p>
          <p class="hint-text">{{ hint }}</p>
        </div>

        <div v-if="error" class="error-message">
          <p>❌ {{ error }}</p>
        </div>

        <div v-if="loading" class="loading-spinner">
          <p>⏳ Fetching hint...</p>
        </div>

        <div class="metadata">
          <p>
            <small>Chapter ID: {{ chapterId }} | Program ID: {{ programId }}</small>
          </p>
        </div>
      </div>
      <footer class="assistant-footer">
        <button @click="fetchHint" :disabled="loading" class="primary-button">
          {{ loading ? 'Fetching...' : 'Get Hint' }}
        </button>
        <button v-if="hint || extractedContent" @click="clearHint" class="secondary-button">
          Clear
        </button>
      </footer>
    </div>
  </div>
</template>
