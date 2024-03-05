<template>
  <div class="bg-white py-4 px-8 w-full flex justify-between items-center">
    <span class="relative">
      <i
        class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
      />
      <InputText v-model="valueSearch" placeholder="Поиск" class="py-1 pl-10" />
    </span>

    <div class="flex items-center">
      <p class="pi pi-bell mr-3 cursor-pointer"></p>

      <div class="flex items-center border-l">
        <Avatar label="P" class="mr-2 ml-3" shape="circle" />
        <div
          class="flex items-center gap-2 cursor-pointer duration-200 hover:text-blue-500"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        >
          <span class="text-sm">{{}}</span>
          <Menu ref="menuAvatar" id="overlay_menu" :model="itemsMenuAvatar" :popup="true" />
          <div class="pi pi-angle-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import { useRouter } from 'vue-router'

const valueSearch = ref<string>('')
const menuAvatar = ref()

const router = useRouter()

interface menyType {
  label: string
  items: {
    label: string
    icon: string
  }[]
}

const itemsMenuAvatar = ref<menyType[]>([
  {
    label: 'Меню',
    items: [
      {
        label: 'Мой профель',
        icon: 'pi pi-user'
      },
      {
        label: 'Редактировать профиля',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: () => {
          logout()
        }
      }
    ]
  }
])

const logout = async () => {
  await supabase.auth.signOut()
  router.push({ name: 'login' })
}

const toggle = (event: any) => {
  menuAvatar.value.toggle(event)
}
</script>
