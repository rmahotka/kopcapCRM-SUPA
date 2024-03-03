<template>
  <div class="bg-white m-6 rounded-xl">
    <div class="card">
      <DataTable
        v-model:filters="filters"
        v-model:selection="selectedProduct"
        :value="customers"
        paginator
        removableSort
        scrollable
        :rows="14"
        size="small"
        dataKey="id"
        tableStyle="min-width: 50rem"
      >
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Поиск по таблице"
                class="py-2"
              />
            </span>
          </div>
        </template>
        <template #empty> Ничего не найдено </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem" frozen></Column>
        <Column field="id" header="№" sortable frozen style="width: 5%"></Column>
        <Column field="name" header="ФИО" sortable frozen style="width: 25%"></Column>
        <Column field="country.name" header="Страна" sortable style="width: 25%"></Column>
        <Column field="company" header="Компания" sortable style="width: 25%"></Column>
        <Column field="status" header="Статус" sortable>
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { CustomerServiceMock } from '@/services/CustomerServiceMock.js'

const customers = ref()
const selectedProduct = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

onMounted(() => {
  CustomerServiceMock.getCustomersMedium().then((data: any) => (customers.value = data))
})

const getSeverity: any = (status: any) => {
  switch (status) {
    case 'unqualified':
      return 'danger'

    case 'qualified':
      return 'success'

    case 'new':
      return 'info'

    case 'negotiation':
      return 'warning'

    case 'renewal':
      return null
  }
}
</script>
