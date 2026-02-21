export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authToken: "",
    username: "",
  }),
})
