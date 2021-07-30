import { createApp } from 'vue'
import App from './App.vue'
//@ts-ignore
import router from "./router/index.js"

createApp(App).use(router).mount('#app')
