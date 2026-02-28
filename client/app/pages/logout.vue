<script setup lang="ts">
import AuthEndpoint from "~/services/AuthEndpoint"

onMounted(async () => {
  await AuthEndpoint.logoutRequest()
})

const handleReturn = () => {
  window.location.reload()
}
</script>
<template>
  <div class="flex flex-col items-center justify-center gap-8 min-h-[90vh]">
    <h2 class="font-bold text-xl">you are now logged out.</h2>

    <Button @click="handleReturn" label="return to login page" variant="text" />
  </div>
</template>
<style lang="scss" scoped></style>
