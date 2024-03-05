<template>
  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/config/supabase'
import { useUserStore } from '@/stores/users'

const userStore = useUserStore()

const appRedy = ref(null)
const user = supabase.auth.getUser()

if (!user) {
  appRedy.value = true
}

supabase.auth.onAuthStateChange((_, session) => {
  userStore.setUser(session)
  appRedy.value = true
})
</script>

<style scoped></style>
