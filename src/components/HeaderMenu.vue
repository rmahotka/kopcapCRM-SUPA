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
        <div @click="visible = true" class="cursor-pointer flex items-center">
          <Avatar
            label=""
            class="mr-2 ml-3 cursor-pointe"
            shape="circle"
            :image="userInfo.imgUser"
          />
          <span class="text-sm font-bold">{{ userInfo.firstName }}</span>
        </div>

        <Dialog
          v-model:visible="visible"
          modal
          header="Профиль"
          :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
          <form action="" class="flex flex-col gap-2">
            <InputText type="text" v-model="userInfo.firstName" />
            <InputText type="text" v-model="userInfo.lastName" />

            <Button @click="updateUser">Сохранить</Button>
          </form>
        </Dialog>

        <i class="pi pi-sign-in cursor-pointer hover:text-blue-500" @click="logout"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { supabase } from '@/config/supabase'
import { useRouter } from 'vue-router'

const valueSearch = ref<string>('')
const visible = ref(false)
const idUser = ref()
const userInfo = reactive({
  id: '',
  firstName: '',
  lastName: '',
  imgUser: ''
})

const router = useRouter()

const getUSer = async () => {
  const infoUser = await supabase.auth.getUser()
  idUser.value = infoUser.data.user.id

  const { data } = await supabase.from('profiles').select().eq('id', idUser.value)
  Object.values(data).forEach((elem) => {
    userInfo.id = elem.id
    userInfo.firstName = elem.first_name
    userInfo.lastName = elem.last_name
    userInfo.imgUser = elem.img_user
  })
}

const updateUser = async () => {
  const { error } = await supabase
    .from('profiles')
    .update({ first_name: userInfo.firstName, last_name: userInfo.lastName })
    .eq('id', userInfo.id)

  visible.value = false
  if (error) return Error
}

onMounted(() => {
  getUSer()
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push({ name: 'login' })
}
</script>
