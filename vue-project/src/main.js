import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@shoelace-style/shoelace/dist/themes/light.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.1/cdn/')

const app = createApp(App)

app.use(router)

app.mount('#app')
