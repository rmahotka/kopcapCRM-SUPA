<template>
  <div class="flex flex-col justify-between py-10 h-full">
    <LogoKopcap class="mx-auto" />
    <div class="flex items-center flex-col">
      <div class="text-center">
        <h2 class="text-3xl font-semibold text-slate-800">С возвращением!</h2>
        <p class="text-slate-600 text-sm mt-3">Пожалуйста введите свои данные.</p>
      </div>

      <form @submit.prevent="handleSignin" class="flex flex-col mt-12 max-w-80 w-full">
        <div class="flex flex-col">
          <label for="username" class="mb-2 text-sm text-slate-800">Ваш Email</label>
          <InputText
            id="username"
            v-model="valueLogin"
            aria-describedby="username-help"
            placeholder="Введите свой email"
            class="h-10"
          />
        </div>
        <div class="card flex flex-col mt-4">
          <label for="password" class="mb-2 text-sm text-slate-800">Пароль</label>
          <Password
            id="password"
            v-model="valuePassword"
            :feedback="false"
            toggleMask
            placeholder="Введите свой пароль"
            class="h-10"
          />
        </div>
        <div class="flex justify-end mt-2">
          <router-link
            to="/signform/forgotPassword"
            class="text-blue-700 text-sm duration-300 hover:text-blue-500"
          >
            Забыли пароль?
          </router-link>
        </div>
        <Button type="submit" label="Войти" class="w-full mt-9 h-10 text-sm" aria-label="Войти" />
      </form>
    </div>
    <div class="text-center">
      <span class="text-slate-600 text-sm duration-300">У вас нет учетной записи?</span>
      <router-link
        class="text-center ml-2 text-sm font-medium text-blue-700 duration-300 hover:text-blue-500"
        to="/signform/registration"
      >
        Регистрация
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import { useRouter } from 'vue-router'
import LogoKopcap from '@/assets/icon/LogoKopcap.vue'

const valueLogin = ref(null)
const valuePassword = ref(null)
const router = useRouter()

const handleSignin = async () => {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: valueLogin.value,
      password: valuePassword.value
    })

    if (data.user && data.session) {
      router.push({
        name: 'Homepanel'
      })
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
  font-size: 14px;
}
</style>
