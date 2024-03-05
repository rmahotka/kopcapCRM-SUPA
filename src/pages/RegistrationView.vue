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

      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col mt-12 max-w-80 w-full relative"
        v-auto-animate
      >
        <div class="flex flex-col">
          <InlineMessage
            class="absolute top-[-60%] right-[-60%]"
            v-if="errMessage"
            severity="error"
          >
            {{ errMessage }}
          </InlineMessage>

          <label for="usermail" class="mb-2 text-sm text-slate-800">Email</label>
          <InputText
            id="usermail"
            v-model="email"
            aria-describedby="username-help"
            placeholder="Введите email"
            class="h-10"
          />
        </div>
        <div class="card flex flex-col mt-4">
          <label for="password" class="mb-2 text-sm text-slate-800">Пароль</label>
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            toggleMask
            placeholder="Придумайте пароль"
            class="h-10"
          />
        </div>
        <div class="card flex flex-col mt-4">
          <label for="confirmPassword" class="mb-2 text-sm text-slate-800">Пароль</label>
          <Password
            id="confirmPassword"
            v-model="confirmPassword"
            :feedback="false"
            toggleMask
            placeholder="Придумайте пароль"
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
import { errorMessages } from 'vue/compiler-sfc'

const router = useRouter()

const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const errMessage = ref(null)

const handleSubmit = async () => {
  if (password.value === confirmPassword.value) {
    try {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })
      if (error) throw error
      router.push({ name: 'login' })
    } catch (error: any) {
      errorMessages.value = error.message
      setTimeout(() => {
        errMessage.value = null
      }, 5000)
    }
  }
  errMessage.value = 'Ошибка, попробуйте снова'
  setTimeout(() => {
    errMessage.value = null
  }, 5000)
}
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
  font-size: 14px;
}
</style>
