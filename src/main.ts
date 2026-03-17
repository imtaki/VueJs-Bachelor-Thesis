import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createPriscillaAI } from './plugins/priscillaAI'

const app = createApp(App)

app.use(createPriscillaAI('https://api.example.com/api/predict/hint'))
app.use(createPinia())

app.mount('#app')
