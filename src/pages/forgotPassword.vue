<template>
  <div class="flex flex-col justify-between py-10 h-full">
    <LogoKopcap class="mx-auto min-h-11 max-h-11" />
    <div class="flex items-center flex-col">
      <div class="text-center">
        <h2 class="text-3xl font-semibold text-slate-800">С возвращением!</h2>
        <p class="text-slate-600 text-sm mt-3">Пожалуйста введите свой Email.</p>
        <p class="text-slate-600 text-sm">Мы отправим на него ссылку для восстановления пароля</p>
      </div>

      <form @submit.prevent="handlePasswordReset" class="flex flex-col mt-12 max-w-80 w-full">
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
        <Button
          type="submit"
          label="Отправить"
          class="w-full mt-9 h-10 text-sm"
          aria-label="Отправить"
        />
      </form>
    </div>
    <div>
      <div class="text-center">
        <span class="text-slate-600 text-sm duration-300">У вас нет учетной записи?</span>
        <router-link
          class="text-center ml-2 text-sm font-medium text-blue-700 duration-300 hover:text-blue-500"
          to="/signform/registration"
        >
          Регистрация
        </router-link>
      </div>
      <div class="text-center">
        <span class="text-slate-600 text-sm duration-300">Вспомнили пароль?</span>
        <router-link
          class="text-center ml-2 text-sm font-medium text-blue-700 duration-300 hover:text-blue-500"
          to="/signform"
        >
          Войти
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import LogoKopcap from '@/assets/icon/LogoKopcap.vue'

const valueLogin = ref<string>('')

const handlePasswordReset = async () => {
  await supabase.auth.resetPasswordForEmail(valueLogin, {})
}
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
  font-size: 14px;
}
</style>
