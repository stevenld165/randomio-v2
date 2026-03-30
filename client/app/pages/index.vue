<script setup lang="ts">
import RandomioEndpoint from "~/services/RandomioEndpoint"
import ShowListEndpoint from "~/services/ShowListEndpoint"
import ToastManager from "~/services/ToastManager"
import type { RandomioResponse } from "~/types/dtos"

definePageMeta({
  layout: "minimal",
})

const currentRoll = ref<RandomioResponse>()
const previousRolls = ref<RandomioResponse[]>([])

const toast = useToast()

const getRoll = async () => {
  if (currentRoll.value) {
    previousRolls.value.push(currentRoll.value)
  }

  try {
    const roll = await RandomioEndpoint.getNextRoll()
    currentRoll.value = roll
  } catch (error) {
    ToastManager.showToast(
      toast,
      "error",
      "Something went wrong",
      "Have you tried adding shows to your list yet?",
    )
    console.error(error)
  }
}

const stremioURL = computed(
  () =>
    `stremio:///detail/series/${currentRoll.value?.selectedShow.imdbId}/${currentRoll.value?.selectedEpisode.id}`,
)

const handleOpenEpisode = () => {
  window.open(stremioURL.value, "_self")
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
      <div class="hidden sm:flex flex-col gap-8 items-center justify-center">
        <Button @click="getRoll" rounded variant="text" class="rounded-full!">
          <img src="/randomio.svg" class="w-5 sm:w-72" />
        </Button>
        <div class="flex flex-col gap-2">
          <Button @click="handleOpenEpisode" label="play" />
          <Button @click="handleGoBack" label="go back" severity="secondary" />
        </div>
      </div>
      <div
        class="flex sm:hidden px-4 py-2 gap-8 bg-black-gradient drop-shadow-2xl rounded-full justify-center items-center"
      >
        <Button @click="getRoll" rounded variant="text" class="rounded-full!">
          <img src="/randomio.svg" class="w-24 sm:w-64" />
        </Button>
        <div class="flex gap-2 px-2">
          <Button
            @click="handleOpenEpisode"
            rounded
            class="rounded-full! flex flex-col"
          >
            <i class="pi pi-play text-3xl!"></i>
          </Button>
          <Button
            @click="handleGoBack"
            severity="contrast"
            rounded
            class="rounded-full! flex flex-col bg-zinc-50!"
          >
            <i class="pi pi-angle-double-left text-3xl!"></i>
          </Button>
        </div>
      </div>
    </template>
  </LayoutTwoColGrad>
</template>
<style lang="scss" scoped></style>
