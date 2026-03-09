<script setup lang="ts">
import { authClient } from "~/lib/auth-client"
import AuthEndpoint from "~/services/AuthEndpoint"
import ShowListEndpoint from "~/services/ShowListEndpoint"

const session = authClient.useSession()
const user = computed(() => session.value.data?.user)

const showList = ref()

onMounted(async () => {
  await refreshData()
})

const refreshData = async () => {
  try {
    const data = await ShowListEndpoint.getShowList()

    showList.value = data
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="px-8 sm:px-36 py-24">
    <div class="flex flex-col gap-4 items-start">
      <h2 class="text-3xl font-bold">{{ user?.name }}'s show list</h2>
      <ShowListAddButton @update="refreshData" />
    </div>
    <div class="mt-24">
      <ShowList @update="refreshData" :show-list="showList" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
