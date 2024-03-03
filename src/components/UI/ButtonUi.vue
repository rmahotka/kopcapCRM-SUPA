<template>
  <Button
    :label="labelBtn"
    :icon="iconBtn"
    :class="[active ? '' : 'text-slate-900 bg-transparent border-none']"
    size="small"
    class="flex items-center py-2 px-4 w-full focus:shadow-none"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Button from 'primevue/button'

defineProps({
  labelBtn: String,
  iconBtn: String,
  active: Boolean
})
</script>

<style scoped>
:deep(.p-button-label) {
  flex: 0 0 auto;
  font-weight: 500;
}

:deep(.p-button-icon) {
  margin-right: 20px;
}
</style>
