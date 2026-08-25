<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import { CLIENT_URL } from "~/constants/api"
import { authClient } from "~/lib/auth-client"
import AuthEndpoint from "~/services/AuthEndpoint"
import ToastManager from "~/services/ToastManager"

const unsuccessfulLogin = ref(false)

const onFormSubmit = async (e: FormSubmitEvent) => {
  try {
    const loginResponse = await AuthEndpoint.loginRequest(
      e.values.email,
      e.values.password,
    )

    if (loginResponse == null) throw new Error("incorrect email/password")

    await navigateTo("/")
  } catch (error) {
    console.error(error)
    unsuccessfulLogin.value = true
  }
}

const confirm = useConfirm()
const toast = useToast()

const handleForgotPassword = async (email: string) => {
  console.log(email)
  if (!email) {
    ToastManager.showToast(
      toast,
      "error",
      "please type an email into the email box before clicking 'forgot password'!",
    )
    return
  }

  confirm.require({
    message: `send password reset email to: "${email}"?`,
    header: "reset password",
    icon: "pi pi-triangle",
    rejectProps: {
      label: "cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "send",
    },
    accept: async () => {
      await authClient.requestPasswordReset({
        email: email,
        redirectTo: `${CLIENT_URL}/reset-password`,
      })
      toast.add({
        severity: "success",
        summary: "success!",
        detail: "password reset instructions have been sent to your email!",
        life: 3000,
      })
    },
    reject: () => {},
  })
}
</script>
<template>
  <div class="flex flex-col gap-8 justify-center">
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
          name="email"
          type="text"
          placeholder="email"
          :invalid="unsuccessfulLogin"
          fluid
        />
        <InputText
          name="password"
          type="password"
          placeholder="password"
          :invalid="unsuccessfulLogin"
          fluid
        />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.email.error?.message }}</Message
        >
        <Button
          @click="() => handleForgotPassword($form.email?.value)"
          variant="text"
          label="forgot password?"
        />
      </div>
      <Button class="mt-4" type="submit" severity="secondary" label="login" />
      <NuxtLink to="/create-account">create new account</NuxtLink>
      <Message
        v-if="unsuccessfulLogin"
        severity="error"
        size="small"
        variant="simple"
      >
        incorrect email/password, try again
      </Message>
    </Form>
  </div>
</template>
<style lang="scss" scoped></style>
