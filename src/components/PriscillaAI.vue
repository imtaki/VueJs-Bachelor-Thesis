<script lang="ts">
import { defineComponent } from 'vue'
import axios, { type CancelTokenSource } from 'axios'
import { getPriscillaAIEndpoint } from '@/plugins/priscillaAI'
import type { PriscillaAIResponse } from '@/types/priscillaAI'

export default defineComponent({
  name: 'PriscillaAI',

  props: {
    xpath: {
      type: String,
      required: true,
      validator: (value: string) => value.trim().length > 0,
    },
    chapterId: {
      type: Number,
      required: true,
      validator: (value: number) => Number.isInteger(value) && value > 0,
    },
    programId: {
      type: Number,
      required: true,
      validator: (value: number) => Number.isInteger(value) && value > 0,
    },
  },

  data() {
    return {
      isOpen: false,
      loading: false,
      hint: '',
      error: '',
      extractedContent: '',
      cancelSource: null as CancelTokenSource | null,
    }
  },

  computed: {
    hasResult(): boolean {
      return !!(this.hint || this.extractedContent)
    },
    buttonLabel(): string {
      return this.loading ? 'Fetching…' : 'Get Hint'
    },
  },

  beforeUnmount() {
    this.cancelSource?.cancel('Component unmounted')
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },

    extractCodeFromXPath(): string {
      let node: Node | null

      try {
        const result = document.evaluate(
          this.xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        )
        node = result.singleNodeValue
      } catch {
        throw new Error(`Invalid XPath expression: "${this.xpath}"`)
      }

      if (!node) {
        throw new Error('No element matched the provided XPath.')
      }

      const content =
        node instanceof HTMLTextAreaElement
          ? node.value
          : (node as HTMLElement).textContent

      if (!content?.trim()) {
        throw new Error('Matched element contains no extractable text.')
      }

      return content.trim()
    },

    async fetchHint() {
      this.cancelSource?.cancel('Superseded by newer request')

      this.loading = true
      this.error = ''
      this.hint = ''
      this.extractedContent = ''

      try {
        const content = this.extractCodeFromXPath()
        this.extractedContent = content

        const endpoint = getPriscillaAIEndpoint()
        if (!endpoint) {
          throw new Error('API endpoint not configured. Please initialise the plugin.')
        }

        this.cancelSource = axios.CancelToken.source()

        const { data } = await axios.post<PriscillaAIResponse>(
          endpoint,
          {
            content,
            chapterId: this.chapterId,
            programId: this.programId,
          },
          { cancelToken: this.cancelSource.token },
        )

        this.hint = data.hint?.trim() || 'No hint available for this submission.'
      } catch (err) {
        if (axios.isCancel(err)) return 

        if (err instanceof Error) {
          this.error = err.message
        } else if (axios.isAxiosError(err)) {
          this.error = `API ${err.response?.status ?? 'Error'}: ${err.message}`
        } else {
          this.error = 'An unexpected error occurred.'
        }
      } finally {
        this.loading = false
      }
    },

    clearHint() {
      this.hint = ''
      this.extractedContent = ''
      this.error = ''
      this.cancelSource?.cancel('Cleared by user')
    },
  },
})
</script>

<template>
  <div class="priscilla-ai">
    <button
      class="assistant-button"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Close hint assistant' : 'Open hint assistant'"
      @click="toggle"
    >
      <span aria-hidden="true">{{ isOpen ? '✖️' : '?' }}</span>
    </button>

    <div
      v-if="isOpen"
      class="assistant-window"
      role="dialog"
      aria-label="Priscilla AI – Code Hint Assistant"
    >
      <header class="assistant-header">Priscilla AI — Code Hint Assistant</header>

      <div class="assistant-body">
        <template v-if="extractedContent">
          <p><strong>Extracted Code:</strong></p>
          <pre class="code-block">{{ extractedContent }}</pre>
        </template>

        <template v-if="hint">
          <p><strong>💡 Hint:</strong></p>
          <p class="hint-text">{{ hint }}</p>
        </template>

        <p v-if="error" class="error-message" role="alert">❌ {{ error }}</p>

        <p v-if="loading" class="loading-spinner" aria-live="polite">⏳ Fetching hint…</p>

        <p class="metadata">
          <small>Chapter {{ chapterId }} · Program {{ programId }}</small>
        </p>
      </div>

      <footer class="assistant-footer">
        <button class="primary-button" :disabled="loading" @click="fetchHint">
          {{ buttonLabel }}
        </button>
        <button v-if="hasResult" class="secondary-button" @click="clearHint">Clear</button>
      </footer>
    </div>
  </div>
</template>