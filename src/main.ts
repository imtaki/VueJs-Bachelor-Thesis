import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import codeAssistant from './plugins/codeAssistant'

createApp(App).use(createPinia()).use(codeAssistant).mount('#app')
