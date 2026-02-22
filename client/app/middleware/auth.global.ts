import AuthEndpoint from "~/services/AuthEndpoint"

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  // call verify endpoint
  const authStore = useAuthStore()

  const identity = await AuthEndpoint.verifyRequest(authStore.authToken)
  console.log("IDENTITY: ", identity)

  // if positive response, keep going
  if (identity) {
    authStore.username = identity.username
    console.log("Successful authorization")

    if (to.path == "/login") return navigateTo("/")

    return
  }

  // if negative response
  // call refresh token
  try {
    const tokenResponse = await AuthEndpoint.refreshRequest()
    console.log("Token res: ", tokenResponse)

    // set new auth and refresh tokens
    authStore.authToken = tokenResponse.accessToken

    if (to.path == "/login") return navigateTo("/")

    return
  } catch (error) {
    console.log("Failed refresh attempt")
  }

  // if refresh token fails
  // go to login page

  if (to.path == "/login") return
  else return navigateTo("/login")
})
