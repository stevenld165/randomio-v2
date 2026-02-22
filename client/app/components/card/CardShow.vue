<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms"
import ShowListEndpoint from "~/services/ShowListEndpoint"
import ToastManager from "~/services/ToastManager"
import type { ShowListEntry } from "~/types/dtos"

const props = defineProps<{
  show: ShowListEntry
}>()

const emit = defineEmits(["update"])

const toast = useToast()

const toggled = ref<boolean>(
  props.show.show_list_entries_table.enabled ?? false,
)

const displayOptions = ref<boolean>(false)

const handleToggleEnabled = async (isEnabled: boolean) => {
  try {
    await ShowListEndpoint.patchToggleEntry(
      isEnabled,
      props.show.show_list_entries_table.id,
    )
    emit("update")
  } catch (error) {
    console.error(error)
  }
}

const defaultValues = computed(() => ({
  includedSeasons: props.show.shows_table.seasons.filter(
    (season) =>
      !props.show.show_list_entries_table.excludedSeasons.includes(season),
  ),
  extraEpisodes: props.show.show_list_entries_table.extraEpisodes,
}))

const handleSubmitOptions = async (e: FormSubmitEvent) => {
  console.log(e.values)
  const { includedSeasons, extraEpisodes } = e.values
  const excludedSeasons = props.show.shows_table.seasons.filter(
    (season) => !includedSeasons.includes(season),
  )

  try {
    const response = await ShowListEndpoint.patchUpdateFilters(
      excludedSeasons,
      extraEpisodes,
      props.show.show_list_entries_table.id,
    )
    console.log(response)

    emit("update")
    displayOptions.value = false

    ToastManager.showToast(toast, "success", "Successfully updated options!")
    e.reset()
  } catch (error) {
    console.error(error)
  }
}

const confirm = useConfirm()

const handleDelete = () => {
  confirm.require({
    message: `are you sure you want to delete ${props.show.shows_table.title}?`,
    header: "delete show",
    icon: "pi pi-trash",
    acceptProps: {
      label: "yes, delete.",
      severity: "danger",
    },
    rejectProps: {
      label: "nevermind!",
      severity: "secondary",
    },
    accept: async () => {
      try {
        await ShowListEndpoint.deleteEntry(
          props.show.show_list_entries_table.id,
        )

        ToastManager.showToast(toast, "success", "Successfully deleted show!")
        emit("update")
      } catch (error) {}
    },
    reject: () => {
      console.log("closed")
    },
  })
}
</script>
<template>
  <div
    class="flex max-w-lg items-start bg-zinc-800 rounded-3xl px-3 py-3 drop-shadow-2xl gap-3"
  >
    <div class="flex-2">
      <img
        class="rounded-3xl drop-shadow"
        :src="show.shows_table.coverImg ?? ''"
      />
    </div>
    <div class="flex-3">
      <div class="flex flex-col rounded-3xl bg-zinc-900 drop-shadow px-4 py-4">
        <span class="font-semibold">{{ show.shows_table.title }}</span>
        <span class="font-light">({{ show.shows_table.releaseYear }})</span>
        <span class="mt-2 text-xs text-zinc-200">{{
          show.shows_table.desc
        }}</span>
      </div>
      <div class="mt-2 flex justify-between">
        <Button @click="displayOptions = true" rounded label="options" />
        <div class="flex gap-1 items-center">
          <ToggleSwitch
            @update:model-value="
              (isEnabled) => {
                handleToggleEnabled(isEnabled)
              }
            "
            v-model="toggled"
          />
          <Button
            @click="handleDelete"
            severity="danger"
            rounded
            variant="text"
            icon="pi pi-trash"
          />
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="displayOptions"
    modal
    header="options"
    class="min-w-fit"
  >
    <div>
      <div class="flex max-w-lg items-start rounded-3xl px-3 py-3 gap-3">
        <div class="flex-2">
          <img
            class="rounded-3xl drop-shadow"
            :src="show.shows_table.coverImg ?? ''"
          />
        </div>
        <div class="flex-3">
          <div class="flex flex-col rounded-3xl px-4 py-4">
            <span class="font-semibold">{{ show.shows_table.title }}</span>
            <span class="font-light">({{ show.shows_table.releaseYear }})</span>
            <span class="mt-2 text-xs">{{ show.shows_table.desc }}</span>
          </div>
        </div>
      </div>
      <Form
        :initial-values="defaultValues"
        @submit="handleSubmitOptions"
        class="flex flex-col gap-4"
      >
        <div>
          <span class="text-lg font-semibold">included seasons:</span>
          <div>
            <CheckboxGroup
              name="includedSeasons"
              class="flex gap-2 flex-wrap max-w-lg"
            >
              <div
                v-for="season in show.shows_table.seasons"
                class="flex items-center gap-1"
              >
                <Checkbox
                  :input-id="show.shows_table.imdbId + season"
                  :value="season"
                />
                <label :for="show.shows_table.imdbId + season">{{
                  season
                }}</label>
              </div>
            </CheckboxGroup>
          </div>
        </div>
        <div class="flex flex-col gap-4 items-start">
          <span
            class="text-lg font-semibold"
            v-tooltip.left="
              'this section will add episodes that are excluded above back into the pool. \nformat them like so: 0:12 (season#:episode#).\nif you are unsure what code to put, consult the TVDB database.'
            "
          >
            <i class="pi pi-info-circle"></i>
            extra episodes:
          </span>
          <div class="flex gap-2">
            <AutoComplete
              name="extraEpisodes"
              :inputId="`extra-episodes-${show.shows_table.imdbId}`"
              multiple
              :typeahead="false"
              class="max-w-md"
              show-clear
            />
          </div>
        </div>
        <Button class="mt-8" type="submit" severity="primary" label="apply" />
      </Form>
    </div>
  </Dialog>
</template>
<style lang="scss" scoped></style>
