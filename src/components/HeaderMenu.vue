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

      <div class="flex items-center border-l gap-3">
        <div @click="visible = true" class="cursor-pointer">
          <Avatar label="P" class="mr-2 ml-3 cursor-pointe" shape="circle" />
          <span class="text-sm font-bold">{{ `rm` }}</span>
        </div>

        <Dialog
          v-model:visible="visible"
          maximizable
          modal
          header="Профиль"
          :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
          <form action="">
            <Dropdown
              v-model="selectedRole"
              :options="roles"
              optionLabel="name"
              placeholder="Выберите роль"
            />
            <InputText type="text" v-model="firstName" />
            <InputText type="text" v-model="lastName" />
          </form>
        </Dialog>

        <i class="pi pi-sign-in cursor-pointer hover:text-blue-500" @click="logout"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/config/supabase'
import { useRouter } from 'vue-router'

const valueSearch = ref<string>('')
const visible = ref(false)
const roles = ref([])
const selectedRole = ref()
const userInfo = ref([])
// const firstName = ref('')
// const lastName = ref('')

const router = useRouter()

const getRole = async () => {
  const { data } = await supabase.from('role').select()
  roles.value = data
}

// !!!!!!!!!!!!!!!!!!
const getUSer = async () => {
  const { data } = await supabase.from('user').select()
  userInfo.value = data
}
onMounted(() => {
  getRole()
  getUSer()
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push({ name: 'login' })
}
</script>
