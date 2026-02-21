import { API_URL } from "~/constants/api"

class ShowListEndpoint {
  getShowList = async (authToken: string) => {
    console.log("test")
    const { data } = await useFetch(`${API_URL}/users/show-list/get`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    return data.value
  }
}

export default new ShowListEndpoint()
