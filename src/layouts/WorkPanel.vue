<template>
  <div class="mx-auto bg-[#F5F6F7] h-full min-h-screen flex">
    <RightMenu />
    <div class="w-full">
      <HeaderMenu />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderMenu from '@/components/HeaderMenu.vue'
import RightMenu from '@/components/RightMenu.vue'
</script>
