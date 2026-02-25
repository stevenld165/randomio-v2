<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import AuthEndpoint from "~/services/AuthEndpoint"

definePageMeta({
  layout: "minimal",
})

const authStore = useAuthStore()

const unsuccessfulLogin = ref(false)

const onFormSubmit = async (e: FormSubmitEvent) => {
  console.log(e.values)
  try {
    const tokenResponse = await AuthEndpoint.loginRequest(
      e.values.username,
      e.values.password,
    )

    await authStore.setToken(tokenResponse)
    console.log(authStore.authToken)

    await navigateTo("/")
  } catch (error) {
    console.error(error)
    unsuccessfulLogin.value = true
  }
}
</script>
<template>
  <LayoutTwoColGrad>
    <div class="flex flex-col justify-center h-[80vh] sm:hidden">
      <AuthLoginForm />
    </div>
    <RandomioRollInfo class="hidden sm:block" />
    <template #black-panel>
      <div class="hidden sm:flex flex-col justify-center">
        <AuthLoginForm />
      </div>
    </template>
  </LayoutTwoColGrad>
</template>
<style lang="scss" scoped></style>
