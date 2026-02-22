import { API_URL } from "~/constants/api"
import type { ShowListEntry } from "~/types/dtos"
import BaseEndpoint from "./BaseEndpoint"

class ShowListEndpoint extends BaseEndpoint {
  constructor() {
    super("/users/show-list")
  }

  getShowList = async () => {
    return await this.getWithAuth<ShowListEntry[]>("/get")
  }

  addEntryReq = async (imdbId: string) => {
    const body = {
      imdbId: imdbId,
    }

    const insertedEntry = await this.postWithAuth("/add", body)
    return insertedEntry
  }

  deleteEntry = async (entryId: number) => {
    const body = {
      entryId: entryId,
    }

    const response = await this.otherWithAuth("/delete", "delete", body)
    return response
  }

  patchToggleEntry = async (isEnabled: boolean, entryId: number) => {
    const body = {
      entryId: entryId,
      enabled: isEnabled,
    }

    const response = await this.otherWithAuth("/toggle", "patch", body)

    console.log(response)
    return response
  }

  patchUpdateFilters = async (
    excludedSeasons: number[],
    extraEpisodes: string[],
    entryId: number,
  ) => {
    const body = {
      entryId: entryId,
      excludedSeasons: excludedSeasons,
      extraEpisodes: extraEpisodes,
    }

    const response = await this.otherWithAuth("/update-filters", "patch", body)

    return response
  }
}

export default new ShowListEndpoint()
