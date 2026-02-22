import type { Show } from "~/types/dtos"
import BaseEndpoint from "./BaseEndpoint"

class ShowEndpoint extends BaseEndpoint {
  constructor() {
    super("/shows")
  }

  getSearch = async (name: string, year: string) => {
    return await this.getBasic<Show>(
      `/search?name=${encodeURI(name)}&year=${encodeURI(year)}`,
    )
  }

  addReq = async (imdbId: string) => {
    return await this.postWithAuth<string>("/add", { imdbId: imdbId })
  }
}

export default new ShowEndpoint()
