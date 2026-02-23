import BaseEndpoint from "./BaseEndpoint"

class UsersEndpoint extends BaseEndpoint {
  constructor() {
    super("/users")
  }

  createUserReq = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    }

    const response = await this.postBasic("/create", body)

    return response
  }
}

export default new UsersEndpoint()
