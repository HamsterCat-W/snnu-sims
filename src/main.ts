import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import './style.css'
import App from './App.vue'

import router from './router/index.ts'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).use(ArcoVue)

app.mount('#app')
