export const useAuthStore = defineStore("authStore", {
  state: () => ({
    authToken: "",
    username: "",
  }),
  actions: {
    async setToken(authToken: string) {
      this.authToken = authToken
    },
  },
})
