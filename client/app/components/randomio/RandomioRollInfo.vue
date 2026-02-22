<script setup lang="ts">
import type { RandomioResponse } from "~/types/dtos"

defineProps<{
  roll?: RandomioResponse
}>()
</script>
<template>
  <div v-if="roll" class="flex flex-col gap-6 transition-all">
    <div class="text-4xl flex gap-2">
      <h2 class="font-bold">{{ roll?.selectedShow.title }}</h2>
      <span>({{ roll?.selectedShow.releaseYear }})</span>
    </div>
    <img
      :src="roll?.selectedEpisode.thumbnail"
      class="max-w-xl rounded-3xl drop-shadow-md"
    />
    <div class="flex flex-col text-2xl text-zinc-200">
      <span class="font-thin"
        >S{{ roll?.selectedEpisode.season }} E{{
          roll?.selectedEpisode.episode
        }}</span
      >
      <span class="font-semibold text-2xl">{{
        roll?.selectedEpisode.name
      }}</span>
    </div>
    <span class="text-zinc-200 text-xl max-w-3/4">
      {{ roll?.selectedEpisode.description }}
    </span>
  </div>
  <div v-else>
    <h2 class="text-4xl">welcome to randomio! here's how it works:</h2>
    <div class="mt-8 flex flex-col gap-4">
      <CardDarkTrans>1. add some shows</CardDarkTrans>
      <CardDarkTrans>2. add some filters</CardDarkTrans>
      <CardDarkTrans>3. roll!</CardDarkTrans>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
