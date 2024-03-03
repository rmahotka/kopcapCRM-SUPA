<template>
  <div class="flex flex-col justify-between py-10 h-full">
    <LogoKopcap class="mx-auto min-h-11 max-h-11" />
    <div class="flex items-center flex-col">
      <div class="text-center">
        <h2 class="text-3xl font-semibold text-slate-800">Регистрация</h2>
        <p class="text-slate-600 text-sm mt-3">
          Заполните все данные чтобы зарегистрировать аккаунт
        </p>
      </div>

      <form @submit.prevent="handleSignup" class="flex flex-col mt-12 max-w-80 w-full">
        <div class="flex flex-col">
          <label for="username" class="mb-2 text-sm text-slate-800">Email</label>
          <InputText
            id="username"
            v-model="valueLogin"
            aria-describedby="username-help"
            placeholder="Введите email"
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
            placeholder="Придумайте пароль"
            class="h-10"
          />
        </div>
        <div class="card flex flex-col mt-4">
          <label for="phone" class="mb-2 text-sm text-slate-800">Телефона</label>
          <InputMask
            id="phone"
            v-model="valuePhone"
            aria-describedby="userphone-help"
            mask="(99)999-99-99"
            placeholder="Введите номер телефона"
            class="h-10"
          />
        </div>
        <Button
          type="submit"
          label="Регистрация"
          class="w-full mt-9 h-10 text-sm"
          aria-label="Регистрация"
        />
      </form>
    </div>
    <div class="text-center">
      <span class="text-slate-600 text-sm duration-300">У вас есть учетная записи?</span>
      <router-link
        class="text-center ml-2 text-sm font-medium text-blue-700 duration-300 hover:text-blue-500"
        to="/signform"
      >
        Войти
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
const valuePhone: any = ref(null)
const router = useRouter()

const handleSignup = async () => {
  try {
    const { data } = await supabase.auth.signUp({
      email: valueLogin.value,
      password: valuePassword.value,
      phone: valuePhone.value
    })
    if (data) {
      valueLogin.value = null
      valuePassword.value = null

      router.push({
        name: 'login'
      })
    }
  } catch (error: any) {
    alert(error.error_description || error.message)
  }
}
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
  font-size: 14px;
}
</style>
