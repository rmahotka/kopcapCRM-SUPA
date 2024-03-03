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
        <li v-for="btn in buttonLabel" :key="btn.id">
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
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import ButtonUi from '@/components/UI/ButtonUi.vue'
import LogoKopcap from '@/assets/icon/LogoKopcap.vue'

interface btnType {
  id: number
  label: string
  icon: string
}

const activeLabel = ref<number>(1)
const buttonLabel = ref<btnType[]>([
  {
    id: 1,
    label: 'Кнопка 1',
    icon: 'pi pi-home'
  },
  {
    id: 2,
    label: 'Кнопка 2',
    icon: 'pi pi-list'
  },
  {
    id: 3,
    label: 'Кнопка 3',
    icon: 'pi pi-file'
  },
  {
    id: 4,
    label: 'Кнопка 4',
    icon: 'pi pi-comment'
  }
])
</script>
