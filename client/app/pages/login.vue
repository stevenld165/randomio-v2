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
  <LayoutTwoColGrad
    background-img="https://images.metahub.space/background/medium/tt3061046/img"
  >
    login to start rolling for random episodes!
    <template #black-panel>
      <h1 class="text-2xl">
        welcome to <span class="font-bold text-violet-400">randomio!</span>
      </h1>
      <Form
        v-slot="$form"
        @submit="onFormSubmit"
        :validate-on-submit="true"
        class="flex flex-col gap-4 items-center"
      >
        <div class="flex flex-col gap-1">
          <InputText
            name="username"
            type="text"
            placeholder="Username"
            :invalid="unsuccessfulLogin"
            fluid
          />
          <InputText
            name="password"
            type="password"
            placeholder="Password"
            :invalid="unsuccessfulLogin"
            fluid
          />
          <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.username.error?.message }}</Message
          >
        </div>
        <Button class="mt-4" type="submit" severity="secondary" label="login" />
        <NuxtLink>create new account</NuxtLink>
        <Message
          v-if="unsuccessfulLogin"
          severity="error"
          size="small"
          variant="simple"
        >
          incorrect username/password, try again
        </Message>
      </Form>
    </template>
  </LayoutTwoColGrad>
</template>
<style lang="scss" scoped></style>
