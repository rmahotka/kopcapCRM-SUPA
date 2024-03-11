<template>
  <div class="bg-white m-6 rounded-xl">
    <DataTable
      v-model:editingRows="editingRows"
      v-model:filters="filters"
      :value="company"
      editMode="row"
      dataKey="id"
      paginator
      :rows="10"
      filterDisplay="row"
      :globalFilterFields="['name']"
      @row-edit-save="onRowEditSave"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <IconField iconPosition="left">
          <InputText v-model="filters['global'].value" placeholder="Поиск по названию" />
        </IconField>
      </template>
      <template #empty> Ничего не найдено </template>
      <Column field="name" header="Название">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column field="how_did_you_find" header="Как нашли нас">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column field="comment" header="Коментарий">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { supabase } from '@/config/supabase'

const company = ref()
const editingRows = ref([])
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.name }
})

const getCompany = async () => {
  const { data } = await supabase.from('company').select()
  company.value = data
}

const onRowEditSave = async (event) => {
  let { newData, index } = event

  company.value[index] = newData
  const { error } = await supabase
    .from('company')
    .update({
      name: company.value[index].name,
      comment: company.value[index].comment,
      how_did_you_find: company.value[index].how_did_you_find
    })
    .eq('id', company.value[index].id)
    .select()

  if (error) return Error
}

onMounted(() => {
  getCompany()
})
</script>

<style lang="scss" scoped></style>
