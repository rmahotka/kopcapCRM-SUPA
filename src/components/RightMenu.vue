<template>
  <div class="w-80 bg-white border-r px-6 py-4">
    <div class="flex items-center gap-4">
      <LogoKopcap class="w-10 h-10" />
      <div class="relative">
        <p class="flex items-center text-lg font-bold text-slate-700">
          <span class="text-slate-700">kopcap</span>
        </p>
        <p class="text-sm font-extrabold leading-none">CRM</p>
      </div>
    </div>
    <nav class="mt-8">
      <ul class="flex flex-col gap-1">
        <li v-for="btn in visibilityButton" :key="btn.id">
          <router-link :to="btn.linkRouter">
            <ButtonUi
              @click="
                () => {
                  activeLabel = btn.id
                }
              "
              :label="btn.label"
              :icon="btn.icon"
              :active="btn.id === activeLabel"
            />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import ButtonUi from '@/components/UI/ButtonUi.vue'
import LogoKopcap from '@/assets/icon/LogoKopcap.vue'
import { supabase } from '@/config/supabase'

interface btnType {
  id: number
  label: string
  icon: string
  linkRouter: string
  display: any
}

const userRole = ref(null)
const idUser = ref()
const activeLabel = ref<number>(1)
const buttonLabel = ref<btnType[]>([
  {
    id: 1,
    label: 'Проекты',
    icon: 'pi pi-folder',
    linkRouter: '/',
    display: ''
  },
  {
    id: 2,
    label: 'Клиенты',
    icon: 'pi pi-building',
    linkRouter: 'companyPanel',
    display: ''
  },
  {
    id: 3,
    label: 'Статистика',
    icon: 'pi pi-chart-line',
    linkRouter: 'statistic',
    display: ''
  },
  {
    id: 4,
    label: 'Новый проект',
    icon: 'pi pi-file',
    linkRouter: 'newProekt',
    display: ''
  },
  {
    id: 5,
    label: 'Пользователи',
    icon: 'pi pi-users',
    linkRouter: 'settings',
    display: ''
  },
  {
    id: 6,
    label: 'Помощь',
    icon: 'pi pi-comment',
    linkRouter: 'help',
    display: ''
  }
])

const getUSer = async () => {
  const infoUser = await supabase.auth.getUser()
  idUser.value = infoUser.data.user.id

  const { data } = await supabase.from('profiles').select('role_id').eq('id', idUser.value)
  userRole.value = data[0].role_id
}

onMounted(() => {
  getUSer()
})

const visibilityButton = computed(() => {
  return buttonLabel.value.filter((btn) => btn.id !== 5 || userRole.value === 1)
})
</script>
