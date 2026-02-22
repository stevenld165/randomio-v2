<script setup lang="ts"></script>
<template>
  <div class="main-container dark-mode min-h-screen">
    <NavigationHeader />
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  background: var(--bg-gradient);
}
</style>
