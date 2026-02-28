import { API_URL } from "~/constants/api"
import type { User, TokenResponse } from "~/types/auth"

import { authClient } from "~/lib/auth-client"

class AuthEndpoint {
  loginRequest = async (email: string, password: string) => {
    const loginResponse = await authClient.signIn.email({
      email: email,
      password: password,
    })

    return loginResponse.data?.user
  }

  logoutRequest = async () => {
    const response = await authClient.signOut()

    return response
  }

  getLoggedInUser = async () => {
    try {
      const { data: session, refetch } = authClient.useSession().value

      if (session == null) throw new Error("Not logged in")

      const user: User = session.user

      return user
    } catch (error) {
      console.error(error)
    }

    return null
  }

  checkLoggedInUser = async () => {
    try {
      const { data: session } = await authClient.getSession()

      if (session == null) throw new Error("not logged in")

      const user: User = session?.user

      return user
    } catch (error) {
      console.error(error)
    }

    return null
  }
}

export default new AuthEndpoint()
