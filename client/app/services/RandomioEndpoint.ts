import { API_URL } from "~/constants/api"
import type { RandomioResponse } from "~/types/dtos"
import BaseEndpoint from "./BaseEndpoint"

class RandomioEndpoint extends BaseEndpoint {
  constructor() {
    super("")
  }

  getNextRoll = async () => {
    const roll = await this.getWithAuth<RandomioResponse>("/roll")

    return roll
  }
}

export default new RandomioEndpoint()
