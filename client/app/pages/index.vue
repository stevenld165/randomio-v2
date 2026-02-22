<script setup lang="ts">
import RandomioEndpoint from "~/services/RandomioEndpoint"
import ShowListEndpoint from "~/services/ShowListEndpoint"
import type { RandomioResponse } from "~/types/dtos"

definePageMeta({
  layout: "minimal",
})

const authStore = useAuthStore()

const currentRoll = ref<RandomioResponse>()
const previousRolls = ref<RandomioResponse[]>([])

const getRoll = async () => {
  if (currentRoll.value) {
    previousRolls.value.push(currentRoll.value)
  }

  try {
    const roll = await RandomioEndpoint.getNextRoll()
    console.log(roll)
    currentRoll.value = roll
  } catch (error) {
    console.log(error)
  }
}

const stremioURL = computed(
  () =>
    `stremio:///detail/series/${currentRoll.value?.selectedShow.imdbId}/${currentRoll.value?.selectedEpisode.id}`,
)

const handleOpenEpisode = () => {
  window.open(stremioURL.value)
}

const handleGoBack = () => {
  if (previousRolls.value.length > 0) {
    const lastRoll = previousRolls.value.pop()

    currentRoll.value = lastRoll
  }
}
</script>
<template>
  <LayoutTwoColGrad :background-img="currentRoll?.selectedShow.backgroundImg">
    <span>
      <RandomioRollInfo :roll="currentRoll" />
    </span>
    <template #black-panel>
      <Button @click="getRoll" rounded variant="text" class="rounded-full!">
        <img src="/randomio.svg" class="w-72" />
      </Button>
      <div class="flex flex-col gap-2">
        <Button @click="handleOpenEpisode" label="play" />
        <Button @click="handleGoBack" label="go back" severity="secondary" />
      </div>
    </template>
  </LayoutTwoColGrad>
</template>
<style lang="scss" scoped></style>
