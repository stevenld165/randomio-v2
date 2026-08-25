<script setup lang="ts">
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms"
import { authClient } from "~/lib/auth-client"

import ToastManager from "~/services/ToastManager"
import UsersEndpoint from "~/services/UsersEndpoint"

const unsuccessfulCreation = ref(false)
const successfulCreation = ref(false)

const route = useRoute()
const token = ref(route.query.token)

const resolver = (e: FormResolverOptions) => {
  const values = e.values

  const errors: {
    password: Record<string, any> | undefined
    confirmPassword: Record<string, any> | undefined
  } = {
    password: [],
    confirmPassword: [],
  }

  if (!values.password) {
    errors.password = [{ message: "password is required." }]
  }

  if (values.password != values.confirmPassword) {
    errors.confirmPassword = [{ message: "passwords do not match." }]
  }

  return {
    errors,
  }
}

const toast = useToast()

const onFormSubmit = async (e: FormSubmitEvent) => {
  if (!e.valid) return

  try {
    await authClient.resetPassword({
      newPassword: e.states.password?.value,
      token: "" + token.value,
    })

    ToastManager.showToast(toast, "success", "Password successfully reset")

    successfulCreation.value = true
  } catch (error) {
    ToastManager.showToast(toast, "error", "" + error)
  }
}
</script>
<template>
  <div
    v-if="token"
    class="flex flex-col items-center justify-center gap-8 min-h-[90vh]"
  >
    <h2 class="text-3xl font-bold">reset password</h2>
    <Form
      v-if="!successfulCreation"
      v-slot="$form"
      @submit="onFormSubmit"
      :resolver="resolver"
      :validate-on-submit="true"
      :validateOnBlur="true"
      :validateOnValueUpdate="true"
      class="flex flex-col gap-4 items-center"
    >
      <div class="flex flex-col gap-1">
        <InputText
          class="mt-4"
          name="password"
          type="password"
          placeholder="new password"
          :invalid="unsuccessfulCreation"
          fluid
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.password.error?.message }}
        </Message>
        <InputText
          name="confirmPassword"
          type="password"
          placeholder="confirm password"
          :invalid="unsuccessfulCreation"
          fluid
        />
        <Message
          v-if="$form.confirmPassword?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.confirmPassword.error?.message }}
        </Message>
      </div>
      <Button
        class="mt-4"
        type="submit"
        severity="secondary"
        label="change password"
      />
      <NuxtLink to="/login">go back to login page</NuxtLink>
      <Message
        v-if="unsuccessfulCreation"
        severity="error"
        size="small"
        variant="simple"
      >
        something went wrong.
      </Message>
    </Form>
    <div v-else class="flex flex-col gap-4 items-center">
      <Message
        v-if="successfulCreation"
        severity="success"
        size="small"
        variant="simple"
      >
        changed password! you can now login using the new password!
      </Message>
      <NuxtLink to="/">go back</NuxtLink>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center gap-8 min-h-[90vh]"
  >
    <span>The reset link is invalid or has expired. Please try again.</span>
  </div>
</template>
<style lang="scss" scoped></style>
