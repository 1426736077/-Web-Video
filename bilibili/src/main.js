import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';
import http from '../http'
const pinia = createPinia()

const app = createApp(App)

app.config.globalProperties.$http = http
app.use(router)
app.use(Vant);
app.use(pinia);
app.mount('#app')