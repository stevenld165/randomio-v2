<script setup lang="ts">
import { PrimeIcons } from "@primevue/core/api"
import AuthEndpoint from "~/services/AuthEndpoint"

const authStore = useAuthStore()

const menuItems = computed(() => [
  {
    label: "edit show list",
    command: handleNavigateToEdit,
  },
  {
    label: "log out",
    class: "text-red-400!",
    style: "color: red!",
    icon: PrimeIcons.SIGN_OUT,
    command: handleLogOut,
  },
])

const handleNavigateToEdit = async () => {
  return navigateTo("/edit")
}

const handleLogOut = async () => {
  await AuthEndpoint.logoutRequest()

  await $fetch("/api/storeRefreshToken", {
    method: "POST",
    body: {
      refreshToken: "",
    },
  })

  authStore.$reset()

  return navigateTo("/login")
}

const navMenuRef = useTemplateRef("navMenu")
</script>
<template>
  <div class="px-8 py-2 font-bold text-lg flex justify-between">
    <NuxtLink to="/"><span>randomio</span></NuxtLink>
    <Button
      @click="navMenuRef?.toggle"
      aria-haspopup="true"
      aria-controls="navigation-menu"
      variant="text"
      severity="secondary"
      ><span class="text-zinc-50"
        >{{ authStore.username }}'s profile</span
      ></Button
    >
    <Menu
      class="text-base"
      :model="menuItems"
      :popup="true"
      id="navigation-menu"
      ref="navMenu"
    />
  </div>
</template>
<style lang="scss" scoped></style>
