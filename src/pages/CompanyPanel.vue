<template>
  <div class="bg-white m-6 rounded-xl">
    <Dialog
      v-model:visible="visible"
      modal
      header="Профиль"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form action="" class="flex flex-col gap-2">
        <label for="company-name">Название</label>
        <InputText id="company-name" type="text" v-model="companyInsert.name" />
        <label for="company-comment">Комментарий</label>
        <InputText id="company-comment" type="text" v-model="companyInsert.comment" />
        <label for="company-how">Как нашли нас</label>
        <InputText id="company-how" type="text" v-model="companyInsert.how_did_you_find" />
        <Button @click="addCompany">Сохранить</Button>
      </form>
    </Dialog>

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
        <div class="flex justify-between">
          <InputText v-model="filters['global'].value" placeholder="Поиск по названию" />
          <Button @click="visible = true" label="Добаить компанию" />
        </div>
      </template>
      <template #empty> Ничего не найдено </template>
      <Column field="name" header="Название">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column field="how_did_you_find" header="Как нашли нас">
        <template #editor="{ data, field }">
          <Textarea v-model="data[field]" rows="5" cols="30" />
        </template>
      </Column>
      <Column field="comment" header="Коментарий">
        <template #editor="{ data, field }">
          <Textarea v-model="data[field]" rows="5" cols="30" />
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
      <Column field="id" :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Удаление"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Удалить клиента?</span>
      </div>
      <template #footer>
        <Button label="Нет" icon="pi pi-times" text @click="deleteProductDialog = false" />
        <Button label="Да" icon="pi pi-check" text @click="deleteProduct" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { supabase } from '@/config/supabase'

const oneCompany = ref({})
const company = ref()
const visible = ref(false)
const editingRows = ref([])
const deleteProductDialog = ref(false)
const companyInsert = reactive({
  id: '',
  name: '',
  comment: '',
  how_did_you_find: ''
})

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

const addCompany = async () => {
  const { error } = await supabase.from('company').insert({
    name: companyInsert.name,
    comment: companyInsert.comment,
    how_did_you_find: companyInsert.how_did_you_find
  })

  companyInsert.name = ''
  companyInsert.comment = ''
  companyInsert.how_did_you_find = ''
  visible.value = false
  getCompany()
  if (error) return Error
}

const confirmDeleteProduct = (comp) => {
  oneCompany.value = comp
  deleteProductDialog.value = true
}

const deleteProduct = async () => {
  const { error } = await supabase.from('company').delete().eq('id', oneCompany.value.id)
  deleteProductDialog.value = false
  oneCompany.value = {}
  getCompany()
  if (error) return error
}

onMounted(() => {
  getCompany()
})
</script>
