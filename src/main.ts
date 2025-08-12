import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import '~/styles/index.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)
  .mount('#app')
