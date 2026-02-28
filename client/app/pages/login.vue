<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import AuthEndpoint from "~/services/AuthEndpoint"

definePageMeta({
  layout: "minimal",
})
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
