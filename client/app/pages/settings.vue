<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem"
import { authClient } from "~/lib/auth-client"

const session = authClient.useSession()
const user = computed(() => session.value.data?.user)

enum SettingsMenuOptions {
  USER_INFO,
  SECURITY,
}

const selectedOption = ref<SettingsMenuOptions>(SettingsMenuOptions.USER_INFO)

const menuItems = ref<MenuItem[]>([
  {
    label: "user info",
    icon: "pi pi-user-edit",
    command: () => {
      selectedOption.value = SettingsMenuOptions.USER_INFO
    },
  },
  {
    label: "security",
    icon: "pi pi-lock",
    command: () => {
      selectedOption.value = SettingsMenuOptions.SECURITY
    },
  },
])
</script>
<template>
  <div class="px-8 sm:px-36 py-24">
    <div class="flex flex-col gap-4 items-start">
      <h2 class="text-3xl font-bold">{{ user?.name }}'s settings</h2>
    </div>
    <div class="mt-18 flex gap-4">
      <Menu :model="menuItems" ref="menu" />
      <div class="px-8">
        <template v-if="selectedOption == SettingsMenuOptions.USER_INFO">
          <h3 class="text-xl font-bold">user settings:</h3>
        </template>
        <template v-else-if="selectedOption == SettingsMenuOptions.SECURITY">
          <h3 class="text-xl font-bold">security:</h3>
        </template>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
