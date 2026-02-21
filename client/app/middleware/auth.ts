import AuthEndpoint from "~/services/AuthEndpoint"

export default defineNuxtRouteMiddleware(async (to, from) => {
  // call verify endpoint
  const authStore = useAuthStore()
  const identity = await AuthEndpoint.verifyRequest(authStore.authToken)
  console.log("IDENTITY: ", identity)
  // if positive response, keep going
  if (identity) {
    authStore.username = identity.username
    console.log("Successful authorization")
    return
  }

  // if negative response
  // call refresh token
  try {
    const tokenResponse = await AuthEndpoint.refreshRequest()
    console.log("Token res: ", tokenResponse)

    // set new auth and refresh tokens
    authStore.authToken = tokenResponse.accessToken

    return
  } catch (error) {
    console.log("Failed refresh attempt")
  }

  // if refresh token fails
  // go to login page
  return navigateTo("/login")
})
