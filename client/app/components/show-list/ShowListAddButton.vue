<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import ShowEndpoint from "~/services/ShowEndpoint"
import ShowListEndpoint from "~/services/ShowListEndpoint"
import ToastManager from "~/services/ToastManager"
import type { Show } from "~/types/dtos"

const emit = defineEmits(["update"])

const showDialog = ref(false)
const foundShow = ref<Show>()
const loading = ref(false)

const toast = useToast()

const handleSubmitSearch = async (e: FormSubmitEvent) => {
  try {
    const { name, year } = e.values
    loading.value = true
    foundShow.value = await ShowEndpoint.getSearch(name, year)
    loading.value = false
  } catch (error) {}
}

const handleAddShow = async () => {
  try {
    if (foundShow.value == null) throw new Error("No found show")

    const imdbIdRes = await ShowEndpoint.addReq(foundShow.value.imdbId)

    const response = await ShowListEndpoint.addEntryReq(imdbIdRes)

    console.log(response)

    ToastManager.showToast(toast, "success", "Sucessfully added show!")
    showDialog.value = false

    emit("update")
  } catch (error) {}
}
</script>
<template>
  <Button
    @click="
      () => {
        foundShow = undefined
        showDialog = true
      }
    "
    icon="pi pi-plus"
    label="add show"
    raised
  />
  <Dialog
    v-model:visible="showDialog"
    modal
    header="add show"
    class="min-w-fit"
  >
    <div v-if="!foundShow" class="flex flex-col gap-2">
      <span class="font-semibold text-lg">search for a show:</span>
      <Form @submit="handleSubmitSearch">
        <div class="flex gap-2">
          <div class="flex-2 flex flex-col">
            <label for="showName">show name</label>
            <InputText
              id="showName"
              name="name"
              type="text"
              placeholder="show title here"
            />
          </div>
          <div class="flex-1 flex flex-col shrink">
            <label for="showYear">show year</label>
            <InputText
              id="showYear"
              name="year"
              type="text"
              placeholder="e.g. 2018"
              class="max-w-24"
            />
          </div>
        </div>
        <Button
          class="mt-8"
          type="submit"
          severity="primary"
          icon="pi pi-search"
          label="search"
          :loading="loading"
        />
      </Form>
    </div>
    <div v-else>
      <span>is this information correct?</span>
      <div class="flex max-w-lg items-start rounded-3xl px-3 py-3 gap-3">
        <div class="flex-2">
          <img
            class="rounded-3xl drop-shadow"
            :src="foundShow.coverImg ?? ''"
          />
        </div>
        <div class="flex-3">
          <div class="flex flex-col rounded-3xl px-4 py-4">
            <span class="font-semibold">{{ foundShow.title }}</span>
            <span class="font-light">({{ foundShow.releaseYear }})</span>
            <span class="mt-2 text-xs">{{ foundShow.desc }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <Button
          @click="foundShow = undefined"
          severity="danger"
          label="retry"
        />
        <Button @click="handleAddShow" label="yes, add show!" />
      </div>
    </div>
  </Dialog>
</template>
<style lang="scss" scoped></style>
