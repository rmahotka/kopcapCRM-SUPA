import 'primeicons/primeicons.css'
import './assets/fonts.css'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from '@/router/'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Password from 'primevue/password'
import InputMask from 'primevue/inputmask'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(PrimeVue, { ripple: true })
app.use(router)
app.use(pinia)
app.use(autoAnimatePlugin)

app.component('InputText', InputText)
app.component('Avatar', Avatar)
app.component('Menu', Menu)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Tag', Tag)
app.component('Button', Button)
app.component('Password', Password)
app.component('InputMask', InputMask)

app.mount('#app')
