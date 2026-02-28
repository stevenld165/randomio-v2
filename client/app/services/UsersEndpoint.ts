import BaseEndpoint from "./BaseEndpoint"

import { authClient } from "~/lib/auth-client"

class UsersEndpoint extends BaseEndpoint {
  constructor() {
    super("/api/auth")
  }

  createUserReq = async (email: string, password: string, name: string) => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: (ctx) => {
          throw new Error(ctx.error.message)
        },
      },
    )

    return data
  }
}

export default new UsersEndpoint()
