import 'primeicons/primeicons.css'
import './assets/fonts.css'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from '@/router/'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import componentsPrime from './components/componentsPrime'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(PrimeVue, { ripple: true })
app.use(router)
app.use(pinia)
app.use(autoAnimatePlugin)

componentsPrime.forEach((component) => app.component(component.name, component))

app.mount('#app')
