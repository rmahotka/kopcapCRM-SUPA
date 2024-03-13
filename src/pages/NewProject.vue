<template>
  <div class="bg-white m-6 rounded-xl">
    <form class="grid grid-cols-2 gap-4" @submit.prevent="">
      <div class="flex flex-col">
        <label for="first-name">Название</label>
        <InputText id="first-name" type="text" v-model="nameProject" />
      </div>
      <div class="flex flex-col">
        <label for="first-name">Сумма проекта</label>
        <InputText id="first-name" type="text" v-model="sumProject" />
      </div>
      <div class="flex flex-col">
        <label for="first-name">Компания</label>
        <Dropdown
          v-model="selectCompany"
          :options="company"
          optionLabel="name"
          placeholder="Select a City"
          checkmark
          :highlightOnSelect="false"
        />
        <!-- <InputText id="first-name" type="text" v-model="company" /> -->
      </div>
      <div class="flex flex-col">
        <label for="first-name">Этап</label>
        <InputText id="first-name" type="text" v-model="stage" />
      </div>
      <Button type="submit" class="col-span-2" label="Создать" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
const stage = ref<string>()
const selectCompany = ref()

const getCompany = async () => {
  const { data } = await supabase.from('company').select()
  data.forEach((element: GetCompany) => {
    company.value.push({
      id: element.id,
      name: element.name
    })
  })
}

const insetrProject = async () => {
  const { erroe } = await supabase.from('order').insert({
    sum: 1,
    name: 2,
    id_stage: 1,
    id_company: 1
  })

  if (erroe) throw Error
}

onMounted(() => {
  getCompany(), insetrProject()
})
</script>

<style lang="scss" scoped></style>
