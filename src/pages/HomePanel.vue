<template>
  <div class="bg-white m-6 rounded-xl">
    <div class="card grid grid-cols-2 gap-5 p-3">
      <div
        class="bg-gray-100 p-4 rounded-md border border-gray-300 cursor-pointer hover:shadow-md duration-200"
        v-for="project in filterProject"
        :key="project.id"
        @click="getOpenModal(project.id, project.id_stage)"
      >
        <p>Название проекта</p>
        <p class="font-bold text-lg mb-2 border-b">{{ project.name }}</p>
        <p>Цена за проект</p>
        <p class="font-bold mb-2 border-b">{{ project.sum }}</p>
        <p>Компания</p>
        <p class="font-bold mb-2 border-b">{{ getCompanyRequest(project.id_company) }}</p>
        <p>Стадия</p>
        <p class="font-bold">{{ getStageRequest(project.id_stage) }}</p>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="visible" modal header="Смена стадии проекта" :style="{ width: '40rem' }">
    <Dropdown
      v-model="selectedStage"
      :options="stage"
      optionLabel="name"
      placeholder="Выберите статус"
      class="w-full mb-2"
    />
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Сохранить" @click="updateStage"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/config/supabase'
import { useUserStore } from '@/stores/users'

const userStore = useUserStore()

const visible = ref<boolean>(false)
const selectedStage = ref()
const prjects = ref<string[]>([])
const company = ref<string[]>([])
const stage = ref<string[]>([])
const idOrder = ref<number>()
const idStage = ref<number>()
const userRole = ref<number | any>()
const filterProject = ref()

const getProjects = async () => {
  const { data, error } = await supabase.from('order').select()
  prjects.value = data

  if (error) return Error
}

// Пользователь
const getUser = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role_id')
    .eq('id', userStore.state.user.id)
  userRole.value = data
  console.log(userRole.value[0].role_id)

  switch (userRole.value[0].role_id) {
    case 1: {
      filterProject.value = prjects.value.filter(
        (item) =>
          item.id_stage == 1 ||
          item.id_stage == 2 ||
          item.id_stage == 3 ||
          item.id_stage == 4 ||
          item.id_stage == 5 ||
          item.id_stage == 6 ||
          item.id_stage == 7 ||
          item.id_stage == 8
      )
      break
    }
    case 2: {
      filterProject.value = prjects.value.filter(
        (item) => item.id_stage == 1 || item.id_stage == 7 || item.id_stage == 2
      )
      break
    }
    case 3: {
      filterProject.value = prjects.value.filter(
        (item) => item.id_stage == 3 || item.id_stage == 7 || item.id_stage == 4
      )
      break
    }
    case 4: {
      filterProject.value = prjects.value.filter((item) => item.id_stage == 5 || item.id_stage == 6)
      break
    }
    case 5: {
      filterProject.value = prjects.value.filter((item) => item.id_stage == 8 || item.id_stage == 3)
      break
    }
    default: {
      break
    }
  }

  if (error) return Error
}

const getCompany = async () => {
  const { data, error } = await supabase.from('company').select()
  company.value = data

  if (error) return Error
}

const getStage = async () => {
  const { data, error } = await supabase.from('stage').select()
  stage.value = data

  if (error) return Error
}

const getCompanyRequest = (getId: number) => {
  const text = company.value.find((idSerch) => idSerch.id === getId)
  return text ? text.name : ''
}

const getStageRequest = (getId: number) => {
  const text = stage.value.find((idSerch) => idSerch.id === getId)
  return text ? text.name : ''
}

const updateStage = async () => {
  const { error } = await supabase
    .from('order')
    .update({
      id_stage: selectedStage.value.id
    })
    .eq('id', idOrder.value)
  visible.value = false
  getProjects()
  if (error) return Error
}

const getOpenModal = (id: number, stageId: number) => {
  idOrder.value = id
  idStage.value = stageId
  visible.value = true
  selectedStage.value = stage.value[idStage.value - 1]
}

onMounted(() => {
  getProjects(), getCompany(), getStage(), getUser()
})
</script>
