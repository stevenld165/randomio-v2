<script setup lang="ts">
import { resolveAlias } from "nuxt/kit"
import type { RandomioResponse } from "~/types/dtos"

const props = defineProps<{
  roll?: RandomioResponse
}>()

const validImg = ref(false)

watchEffect(async () => {
  try {
    const img = await $fetch(props.roll?.selectedEpisode.thumbnail ?? "")
    console.log(img)
    validImg.value = true
  } catch (error) {
    validImg.value = false
  }
})
</script>
<template>
  <div v-if="roll" class="flex flex-col items-start gap-6 transition-all">
    <div class="text-2xl sm:text-4xl flex gap-2">
      <h2 class="font-bold">{{ roll?.selectedShow.title }}</h2>
      <span>({{ roll?.selectedShow.releaseYear }})</span>
    </div>
    <NuxtImg
      v-if="validImg"
      :src="roll?.selectedEpisode.thumbnail"
      class="min-w-0 max-h-[35vh] rounded-3xl drop-shadow-md transition-all"
    />
    <div class="flex flex-col text-lg sm:text-2xl text-zinc-200">
      <span class="font-thin"
        >S{{ roll?.selectedEpisode.season }} E{{
          roll?.selectedEpisode.episode
        }}</span
      >
      <span class="font-semibold text-lg sm:text-2xl">{{
        roll?.selectedEpisode.name
      }}</span>
    </div>
    <span class="text-zinc-200 sm:text-xl sm:max-w-3/4">
      {{ roll?.selectedEpisode.description }}
    </span>
  </div>
  <div v-else>
    <RandomioHelpInfo />
  </div>
</template>
<style lang="scss" scoped></style>
