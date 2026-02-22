<script setup lang="ts">
defineProps({
  backgroundImg: String,
})
</script>
<template>
  <div
    class="h-screen transition-all"
    :style="{
      background: backgroundImg
        ? `url(${backgroundImg})`
        : 'url(/default-bg.jpg)',
    }"
  >
    <div class="grad-bg min-h-full flex flex-col max-h-screen">
      <NavigationHeader />
      <div class="flex grow px-8 py-4 gap-4 overflow-hidden">
        <div
          class="flex-5 px-24 py-16 flex flex-col gap-4 justify-center min-w-0 text-wrap overflow-hidden"
        >
          <slot></slot>
        </div>
        <div class="flex-2 flex flex-col gap-8 items-center justify-center">
          <slot name="black-panel"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grad-bg {
  background:
    linear-gradient(0deg, rgba(12, 12, 16, 0.35), rgba(12, 12, 16, 0.35)),
    linear-gradient(90deg, rgba(12, 12, 16, 0) 0%, #0c0c10 70%);
  backdrop-filter: blur(24px);
}
</style>
