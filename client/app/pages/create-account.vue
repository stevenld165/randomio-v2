<script setup lang="ts">
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms"

import ToastManager from "~/services/ToastManager"
import UsersEndpoint from "~/services/UsersEndpoint"

const unsuccessfulCreation = ref(false)
const successfulCreation = ref(false)

const resolver = (e: FormResolverOptions) => {
  const values = e.values

  const errors: {
    email: Record<string, any> | undefined
    password: Record<string, any> | undefined
    confirmPassword: Record<string, any> | undefined
    displayName: Record<string, any> | undefined
  } = {
    email: [],
    password: [],
    confirmPassword: [],
    displayName: [],
  }

  if (!values.email) {
    errors.email = [{ message: "email is required." }]
  }

  if (!values.displayName) {
    errors.displayName = [{ message: "display name is required." }]
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
    await UsersEndpoint.createUserReq(
      e.states.email?.value,
      e.states.password?.value,
      e.states.displayName?.value,
    )

    ToastManager.showToast(
      toast,
      "success",
      "Account sucessfully created, you are now logged in!",
    )

    successfulCreation.value = true
  } catch (error) {
    ToastManager.showToast(toast, "error", "" + error)
  }
}
</script>
<template>
  <div class="flex flex-col items-center justify-center gap-8 min-h-[90vh]">
    <h2 class="text-3xl font-bold">create new account</h2>
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
          name="email"
          type="email"
          placeholder="email"
          :invalid="unsuccessfulCreation"
          fluid
        />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.email.error?.message }}
        </Message>
        <InputText
          name="displayName"
          type="text"
          placeholder="display name"
          :invalid="unsuccessfulCreation"
          fluid
        />
        <Message
          v-if="$form.displayName?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.displayName.error?.message }}
        </Message>

        <InputText
          class="mt-4"
          name="password"
          type="password"
          placeholder="password"
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
        label="register"
      />
      <NuxtLink to="/login">go back to login page</NuxtLink>
      <Message
        v-if="unsuccessfulCreation"
        severity="error"
        size="small"
        variant="simple"
      >
        incorrect username/password, try again
      </Message>
    </Form>
    <div v-else class="flex flex-col gap-4 items-center">
      <Message
        v-if="successfulCreation"
        severity="success"
        size="small"
        variant="simple"
      >
        created account! you are now logged in!
      </Message>
      <NuxtLink to="/">go back</NuxtLink>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
