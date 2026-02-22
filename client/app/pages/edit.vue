<script setup lang="ts">
const authStore = useAuthStore()

import ShowListEndpoint from "~/services/ShowListEndpoint"

const showList = ref()

onMounted(async () => {
  await refreshData()
})

const refreshData = async () => {
  console.log("refreshing data")
  try {
    const data = await ShowListEndpoint.getShowList()

    showList.value = data
    console.log(showList.value)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="px-36 py-24">
    <div class="flex flex-col gap-4 items-start">
      <h2 class="text-3xl font-bold">{{ authStore.username }}'s show list</h2>
      <ShowListAddButton @update="refreshData" />
    </div>
    <div class="mt-24">
      <ShowList @update="refreshData" :show-list="showList" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
