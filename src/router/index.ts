import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/LoginView.vue'
import Registration from '@/pages/RegistrationView.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import HomePanel from '@/pages/HomePanel.vue'
import WorkPanel from '@/layouts/WorkPanel.vue'
import SignForm from '@/layouts/SignForm.vue'

const routes = [
  {
    path: '/signform',
    component: SignForm,
    name: 'Signform',
    children: [
      { path: '', component: Login, name: 'login' },
      { path: 'registration', component: Registration, name: 'registration' },
      { path: 'forgotPassword', component: ForgotPassword, name: 'forgotpassword' }
    ]
  },
  {
    path: '',
    component: WorkPanel,
    name: 'workPanel',
    meta: {
      requiresAuth: true,
      auth: true
    },
    children: [{ path: '', component: HomePanel, name: 'Homepanel' }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
