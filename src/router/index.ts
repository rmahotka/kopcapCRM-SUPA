import SignForm from '@/layouts/SignForm.vue'
import WorkPanel from '@/layouts/WorkPanel.vue'
import CompanyPanel from '@/pages/CompanyPanel.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import Help from '@/pages/Help.vue'
import HomePanel from '@/pages/HomePanel.vue'
import Login from '@/pages/LoginView.vue'
import newProekt from '@/pages/NewProject.vue'
import Registration from '@/pages/RegistrationView.vue'
import Settings from '@/pages/Settings.vue'
import Statistic from '@/pages/Statistic.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/config/supabase'

const routes = [
  {
    path: '/signform',
    component: SignForm,
    name: 'Signform',
    meta: {
      auth: false
    },
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
      auth: true
    },
    children: [
      { path: '', component: HomePanel, name: 'Homepanel' },
      { path: 'companyPanel', component: CompanyPanel, name: 'Companypanel' },
      { path: 'statistic', component: Statistic, name: 'statistic' },
      { path: 'newProekt', component: newProekt, name: 'newProekt' },
      { path: 'settings', component: Settings, name: 'settings' },
      { path: 'help', component: Help, name: 'help' }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  supabase.auth.getUser().then(userLog => {
    if (to.matched.some((res=>res.meta.auth))){
      if(userLog.data.user){
        next();
        return
      } 
      next({name: 'login'})
      return
    } 
    next()
  }).catch(error => {
    console.error('Error fetching user:', error);
    next(false);
  });
}); 

export default router
