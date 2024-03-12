<template>
  <div class="bg-white m-6 rounded-xl">
    <form>
      <div>
        <label for="first-name">Название</label>
        <InputText id="first-name" type="text" v-model="nameProject" />
      </div>
      <div>
        <label for="first-name">Сумма проекта</label>
        <InputText id="first-name" type="text" v-model="sumProject" />
      </div>
      <div>
        <label for="first-name">Компания</label>
        <InputText id="first-name" type="text" v-model="company" />
      </div>
      <div>
        <label for="first-name">Этап</label>
        <InputText id="first-name" type="text" v-model="stage" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nameProject = ref<string>('')
const sumProject = ref<string>('')
const company = ref<string>()
const stage = ref<string>()
</script>

<style lang="scss" scoped></style>
