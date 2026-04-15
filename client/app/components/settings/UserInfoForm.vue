<script setup lang="ts">
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms"
import { authClient } from "~/lib/auth-client"
import ToastManager from "~/services/ToastManager"

const session = authClient.useSession()
const userData = computed(() => session.value.data?.user)

const toast = useToast()

const initialValues = reactive({
  displayName: "",
  email: "",
})

watchEffect(async () => {
  initialValues.displayName = userData.value?.name ?? ""
  initialValues.email = userData.value?.email ?? ""
})

const resolver = (e: FormResolverOptions) => {
  const values = e.values

  const errors: {
    email: Record<string, any> | undefined
    displayName: Record<string, any> | undefined
  } = {
    email: [],
    displayName: [],
  }

  if (
    values.displayName != initialValues.displayName ||
    values.email != initialValues.email
  ) {
    changesMade.value = true
  } else {
    changesMade.value = false
  }

  if (!values.displayName) {
    errors.displayName = [{ message: "display name is required." }]
  }

  return {
    errors,
  }
}

const changesMade = ref(false)

const handleSubmit = async (e: FormSubmitEvent) => {
  if (!e.valid) return

  console.log(e)

  try {
    await authClient.updateUser({
      name: e.states.displayName?.value,
    })

    ToastManager.showToast(
      toast,
      "success",
      `Successfully updated display name to ${e.states.displayName?.value}`,
    )
  } catch (error) {
    ToastManager.showToast(toast, "error", "Something went wrong", "" + error)
  }
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
      <label for="account-settings-display-name">display name:</label>
      <InputText
        id="account-settings-display-name"
        name="displayName"
        type="text"
        placeholder="john doe"
      />
    </div>
    <div class="flex flex-col">
      <label for="account-settings-email">email:</label>
      <InputText
        id="account-settings-email"
        name="email"
        type="email"
        placeholder="johndoe@email.com"
        disabled
      />
      <span class="text-green-400" v-if="userData?.emailVerified"
        >email is verified</span
      >
      <span class="text-red-400" v-else>email is NOT verified</span>
    </div>
    <Button :disabled="!changesMade" type="submit" label="confirm changes" />
  </Form>
</template>
<style lang="scss" scoped></style>
