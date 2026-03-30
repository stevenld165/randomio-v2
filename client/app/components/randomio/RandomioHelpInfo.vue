<script setup lang="ts">
const checkboxValues = ref(["1", "2", "3"])
</script>
<template>
  <h2 class="text-4xl">welcome to randomio! here's how it works:</h2>
  <div class="mt-8 flex flex-col sm:flex-row gap-4">
    <div class="flex flex-col gap-4">
      <CardDarkTrans>
        <span class="font-semibold">1. add shows to your list</span>
        <NuxtLink to="/edit">
          <Button icon="pi pi-plus" label="add show" raised />
        </NuxtLink>
      </CardDarkTrans>
      <CardDarkTrans>
        <span class="font-semibold">2. add some filters</span>
        <div
          class="rounded-2xl p-4 bg-(--prime-dialog-background) text-(--prime-dialog-color)"
        >
          <span class="text-lg font-semibold">included seasons:</span>
          <NuxtLink to="/edit">
            <div class="flex gap-2">
              <div class="flex items-center gap-1">
                <Checkbox
                  name="options-example-checkbox"
                  v-model="checkboxValues"
                  value="0"
                  readonly
                />
                <label>0</label>
              </div>
              <div class="flex items-center gap-1">
                <Checkbox
                  name="options-example-checkbox"
                  v-model="checkboxValues"
                  value="1"
                  readonly
                />
                <label>1</label>
              </div>
              <div class="flex items-center gap-1">
                <Checkbox
                  name="options-example-checkbox"
                  v-model="checkboxValues"
                  value="2"
                  readonly
                />
                <label>2</label>
              </div>
              <div class="flex items-center gap-1">
                <Checkbox
                  name="options-example-checkbox"
                  v-model="checkboxValues"
                  value="3"
                  readonly
                />
                <label>3</label>
              </div>
            </div>
          </NuxtLink>
        </div>
      </CardDarkTrans>
    </div>

    <CardDarkTrans>
      <span class="font-semibold">3. roll!</span>
      <img src="/randomio.svg" class="w-48" />
    </CardDarkTrans>
  </div>
</template>
<style lang="scss" scoped></style>
