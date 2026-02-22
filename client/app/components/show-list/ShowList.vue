<script setup lang="ts">
import type { ShowListEntry } from "~/types/dtos"

defineProps<{
  showList: ShowListEntry[]
}>()

const emit = defineEmits(["update"])
</script>
<template>
  <div>
    <h3 class="font-bold text-xl">{{ showList?.length }} entries:</h3>
    <div class="mt-6 flex gap-4 max-w-fit m-auto flex-wrap">
      <CardShow
        @update="$emit('update')"
        v-for="show in showList"
        :show="show"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
