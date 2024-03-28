import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia)

app.mount('#app')
