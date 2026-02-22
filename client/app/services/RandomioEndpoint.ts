import { API_URL } from "~/constants/api"
import type { RandomioResponse } from "~/types/dtos"

class RandomioEndpoint {
  getNextRoll = async () => {
    const authToken = useAuthStore().authToken

    const roll: RandomioResponse = await $fetch(`${API_URL}/roll`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    return roll
  }
}

export default new RandomioEndpoint()
