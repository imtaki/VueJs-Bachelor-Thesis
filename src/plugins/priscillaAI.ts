import type { App } from 'vue'
import PriscillaAI from '@/components/PriscillaAI.vue'

let apiEndpoint: string = ''

export function createPriscillaAI(endpoint: string) {
  return {
    install(app: App) {
      apiEndpoint = endpoint

      app.config.globalProperties.$priscillaAIEndpoint = apiEndpoint

      app.component('PriscillaAI', PriscillaAI)
    },
  }
}

export function getPriscillaAIEndpoint(): string {
  return apiEndpoint
}

