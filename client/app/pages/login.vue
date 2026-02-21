<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import AuthEndpoint from "~/services/AuthEndpoint"

const authStore = useAuthStore()

const onFormSubmit = async (e: FormSubmitEvent) => {
  console.log(e.values)
  try {
    const tokenResponse = await AuthEndpoint.loginRequest(
      e.values.username,
      e.values.password,
    )

    authStore.authToken = tokenResponse
    console.log(authStore.authToken)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <Form
    v-slot="$form"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full sm:w-56"
  >
    <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Username" fluid />
      <InputText name="password" type="password" placeholder="Password" fluid />
      <Message
        v-if="$form.username?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.username.error?.message }}</Message
      >
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
  <NuxtLink to="/"><Button label="home" /></NuxtLink>
</template>
<style lang="scss" scoped></style>
