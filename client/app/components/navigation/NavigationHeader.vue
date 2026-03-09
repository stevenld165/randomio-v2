<script setup lang="ts">
import { PrimeIcons } from "@primevue/core/api"
import { authClient } from "~/lib/auth-client"

const session = authClient.useSession()
const user = computed(() => session.value.data?.user)

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
  return navigateTo("/logout")
}

const navMenuRef = useTemplateRef("navMenu")
</script>
<template>
  <div class="px-8 py-2 font-bold text-lg flex justify-between items-center">
    <NuxtLink to="/"><span>randomio</span></NuxtLink>
    <Button
      v-if="user"
      @click="navMenuRef?.toggle"
      aria-haspopup="true"
      aria-controls="navigation-menu"
      variant="text"
      severity="secondary"
    >
      <span class="text-violet-400 flex gap-1 items-center">
        <span class="font-semibold text-zinc-50">hi</span>{{ user.name }}!
      </span>
    </Button>
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
