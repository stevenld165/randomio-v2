<script setup lang="ts"></script>
<template>
  <div
    class="px-6 py-6 rounded-3xl drop-shadow max-w-fit card flex flex-col gap-4 items-start"
  >
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.card {
  background:
    linear-gradient(
      180deg,
      rgba(241, 94, 222, 0) 0%,
      rgba(119, 91, 244, 0.2) 100%
    ),
    #0c0c1059;
}
</style>
