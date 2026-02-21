<script setup lang="ts">
import ShowListEndpoint from "~/services/ShowListEndpoint"

definePageMeta({
  middleware: "auth",
})

const authStore = useAuthStore()

const showList = await ShowListEndpoint.getShowList(authStore.authToken)
console.log(showList)
</script>
<template>
  <NuxtLink to="/login"><Button label="Login" /></NuxtLink>
  <span
    >Current login info: {{ authStore.username }}
    {{ authStore.authToken }}</span
  >
</template>
<style lang="scss" scoped></style>
