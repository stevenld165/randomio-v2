<script setup lang="ts">
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms"
import AuthEndpoint from "~/services/AuthEndpoint"
import ToastManager from "~/services/ToastManager"
import UsersEndpoint from "~/services/UsersEndpoint"

const unsuccessfulCreation = ref(false)
const successfulCreation = ref(false)

const resolver = (e: FormResolverOptions) => {
  const values = e.values

  const errors: {
    username: Record<string, any> | undefined
    password: Record<string, any> | undefined
    confirmPassword: Record<string, any> | undefined
  } = {
    username: [],
    password: [],
    confirmPassword: [],
  }

  if (!values.username) {
    errors.username = [{ message: "username is required." }]
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
      e.states.username?.value,
      e.states.password?.value,
    )

    ToastManager.showToast(
      toast,
      "success",
      "Account sucessfully created, you can now login",
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
          name="username"
          type="text"
          placeholder="username"
          :invalid="unsuccessfulCreation"
          fluid
        />
        <Message
          v-if="$form.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.username.error?.message }}
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
        created account! you can now return to the login page and login!
      </Message>
      <NuxtLink to="/login">go back to login page</NuxtLink>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
