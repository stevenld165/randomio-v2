import { API_URL } from "~/constants/api"
import type { Identity, TokenResponse } from "~/types/auth"

class AuthEndpoint {
  loginRequest = async (username: string, password: string) => {
    const tokenResponse: TokenResponse = await $fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: {
        username: username,
        password: password,
      },
    })

    await useFetch("/api/storeRefreshToken", {
      method: "POST",
      body: {
        refreshToken: tokenResponse.refreshToken,
      },
    })

    return tokenResponse.accessToken
  }

  refreshRequest = async () => {
    const refreshToken = (await useFetch("/api/getRefreshToken")).data.value
    console.log("refresh token: ", refreshToken)

    const tokenResponse: TokenResponse = (
      await useFetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        body: {
          refreshToken: refreshToken,
        },
      })
    ).data.value as TokenResponse

    await $fetch("/api/storeRefreshToken", {
      method: "POST",
      body: {
        refreshToken: tokenResponse.refreshToken,
      },
    })

    return tokenResponse
  }

  logoutRequest = async () => {
    const refreshToken = await $fetch("/api/getRefreshToken")
    const res = await $fetch(`${API_URL}/auth/logout`, {
      method: "DELETE",
      body: {
        refreshToken: refreshToken,
      },
    })

    return res
  }

  // you won't need this proabbly
  getRefreshToken = async () => {
    return await $fetch("/api/getRefreshToken")
  }

  verifyRequest = async (authToken: string) => {
    try {
      const data: Identity = await $fetch(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      return data
    } catch (error) {
      console.error(error)
    }

    return null
  }
}

export default new AuthEndpoint()
