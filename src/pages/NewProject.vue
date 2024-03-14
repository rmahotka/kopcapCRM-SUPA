<template>
  <div class="bg-white m-6 rounded-xl relative">
    <Toast />
    <form class="grid grid-cols-2 gap-4" @submit.prevent="insetrProject">
      <div class="flex flex-col">
        <label for="first-name">Название</label>
        <InputText id="first-name" type="text" v-model="nameProject" />
      </div>
      <div class="flex flex-col">
        <label for="first-name">Сумма за проект</label>
        <InputText id="first-name" type="number" v-model="sumProject" />
      </div>
      <div class="flex flex-col">
        <label for="first-name">Компания</label>
        <Dropdown
          v-model="selectCompany"
          :options="company"
          optionLabel="name"
          placeholder="Выберите компанию"
          checkmark
          :highlightOnSelect="false"
        />
      </div>
      <div class="flex flex-col">
        <label for="first-name">Этап</label>
        <Dropdown
          v-model="selectStage"
          :options="stage"
          optionLabel="name"
          placeholder="Выберите компанию"
          checkmark
          :highlightOnSelect="false"
        />
      </div>
      <Button type="submit" class="col-span-2" label="Создать" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { supabase } from '@/config/supabase'

interface Select {
  id: number
  name: string
}

interface GetCompany {
  id: number
  name: string
  created_at: string
  how_did_you_find: string
  comment: string
}

const nameProject = ref<string>('')
const sumProject = ref<string>('')
const company = ref<Select[]>([])
const stage = ref<Select[]>([])
const selectCompany = ref()
const selectStage = ref()

const toast = useToast()

const getCompany = async () => {
  const { data } = await supabase.from('company').select()
  data.forEach((element: GetCompany) => {
    company.value.push({
      id: element.id,
      name: element.name
    })
  })
}

const getStage = async () => {
  const { data } = await supabase.from('stage').select()
  data.forEach((element: Select) => {
    stage.value.push({
      id: element.id,
      name: element.name
    })
  })
}

const insetrProject = async () => {
  const { error } = await supabase.from('order').insert({
    sum: sumProject.value,
    name: nameProject.value,
    id_stage: selectStage.value.id,
    id_company: selectCompany.value.id
  })

  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Документ создан',
    life: 3000
  })
  sumProject.value = ''
  nameProject.value = ''

  if (error) return Error
}

onMounted(() => {
  getCompany(), getStage()
})
</script>

<style lang="scss" scoped></style>
