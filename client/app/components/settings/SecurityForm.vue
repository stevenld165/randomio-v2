<script setup lang="ts">
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms"
import { authClient } from "~/lib/auth-client"
import ToastManager from "~/services/ToastManager"

const session = authClient.useSession()
const userData = computed(() => session.value.data?.user)

const toast = useToast()

const initialValues = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
})

const resolver = (e: FormResolverOptions) => {
  const values = e.values

  const errors: {
    currentPassword: Record<string, any> | undefined
    newPassword: Record<string, any> | undefined
    confirmPassword: Record<string, any> | undefined
  } = {
    currentPassword: [],
    newPassword: [],
    confirmPassword: [],
  }

  if (!values.newPassword) {
    errors.newPassword = [{ message: "new password cannot be empty" }]
  }

  if (values.newPassword != values.confirmPassword) {
    errors.confirmPassword = [{ message: "passwords do not match" }]
  }

  return {
    errors,
  }
}

const handleSubmit = async (e: FormSubmitEvent) => {
  console.log("attempting to change password")

  if (!e.valid) return

  console.log(e)

  try {
    const { data, error } = await authClient.changePassword({
      newPassword: e.states.newPassword?.value ?? "", // required
      currentPassword: e.states.currentPassword?.value ?? "", // required
      revokeOtherSessions: true,
    })

    if (error) throw new Error(error.message)

    console.log(data)

    ToastManager.showToast(
      toast,
      "success",
      "Successfully changed your password",
    )
  } catch (error) {
    ToastManager.showToast(toast, "error", "" + error)
  }
}

const confirm = useConfirm()

const handleLogoutOtherDevices = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: "are you sure you want to proceed?",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "yes",
    },
    accept: async () => {
      try {
        await authClient.revokeOtherSessions()
        ToastManager.showToast(toast, "success", "Logged out of other devices!")
      } catch (error) {
        ToastManager.showToast(toast, "error", "" + error)
      }
    },
    reject: () => {},
  })
}
</script>
<template>
  <Form
    v-slot="$form"
    :initial-values="initialValues"
    :resolver="resolver"
    class="py-4 flex flex-col gap-4 items-baseline"
    @submit="handleSubmit"
  >
    <div class="flex flex-col">
      <label for="security-current-password">current password:</label>
      <InputText
        id="security-current-password"
        name="currentPassword"
        type="password"
        placeholder="enter current password..."
      />
      <Message
        v-if="$form.currentPassword?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.currentPassword.error?.message }}
      </Message>
    </div>
    <div>
      <div class="flex flex-col">
        <label for="security-new-password">new password:</label>
        <InputText
          id="security-new-password"
          name="newPassword"
          type="password"
          placeholder="enter new passsword..."
        />
        <Message
          v-if="$form.newPassword?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.newPassword.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col">
        <label for="security-confirm-password">confirm new password:</label>
        <InputText
          id="security-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="enter new passsword again..."
        />
        <Message
          v-if="$form.confirmPassword?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.confirmPassword.error?.message }}
        </Message>
      </div>
    </div>

    <Button type="submit" label="change password" />
  </Form>

  <Button
    @click="handleLogoutOtherDevices($event)"
    class="mt-4"
    severity="danger"
    label="logout of other devices"
  />
</template>
<style lang="scss" scoped></style>
