<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: "dark-mode",
  },
})
</script>

<template>
  <div>
    <NuxtLayout>
      <Toast position="bottom-right" />
      <ConfirmDialog></ConfirmDialog>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
