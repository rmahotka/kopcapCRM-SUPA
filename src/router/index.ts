import { createRouter, createWebHistory } from 'vue-router'
import useAuthUser from '@/config/UseAuthUser'
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

router.beforeEach((to) => {
  // here we check it the user is logged in
  // if they aren't and the route requries auth we redirect to the login page
  const requiresAuth = to.matched.some((workPanel) => workPanel.meta.auth)

  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && requiresAuth) {
    return { name: 'login' }
  }
})

export default router
