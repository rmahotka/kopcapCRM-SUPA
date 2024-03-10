<template>
  <div class="bg-white m-6 rounded-xl">
    <div class="card">
      <DataTable
        v-model:editingRows="editingRows"
        :value="user"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
        tableStyle="min-width: 50rem"
      >
        <Column field="last_name" header="Фамилия">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>
        <Column field="first_name" header="Имя">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>
        <Column field="role_id" header="Роль">
          <template #body="{ data }">
            {{ getRoleName(data.role_id) }}
          </template>
          <template #editor="{ data, field }">
            <select
              name="role"
              id="role"
              v-model="data[field]"
              class="p-3 w-10/12 border border-stone-300 rounded-md"
            >
              <option v-for="role in roles" :value="role.id" :key="role.id">
                {{ role.name }}
              </option>
            </select>
          </template>
        </Column>
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/config/supabase'

const user = ref()
const editingRows = ref([])
const roles = ref([])

const getUser = async () => {
  const { data } = await supabase.from('user').select()
  user.value = data
}

const getRole = async () => {
  const { data } = await supabase.from('role').select()
  roles.value = data
}

const getRoleName = (roleId) => {
  const role = roles.value.find((role) => role.id === roleId)
  return role ? role.name : ''
}

const onRowEditSave = async (event) => {
  let { newData, index } = event

  user.value[index] = newData
  const { erroe } = await supabase
    .from('user')
    .update({
      last_name: user.value[index].last_name,
      first_name: user.value[index].first_name,
      role_id: user.value[index].role_id
    })
    .eq('id', user.value[index].id)

  if (erroe) return Error
}

onMounted(() => {
  getUser(), getRole()
})
</script>

<style lang="scss" scoped></style>
