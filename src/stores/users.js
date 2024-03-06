import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: null,
  });

  const setUser = (payload) => {
    state.user = payload ? payload.user : null;
  }

  return { state, setUser }
})
