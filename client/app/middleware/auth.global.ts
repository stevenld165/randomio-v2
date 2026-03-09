import AuthEndpoint from "~/services/AuthEndpoint"

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("RUNNING AUTH")

  if (import.meta.server) return
  // call verify endpoint

  const identity = await AuthEndpoint.checkLoggedInUser()
  //console.log("IDENTITY: ", identity)

  // if positive response, keep going
  if (identity) {
    console.log("Successful authorization")

    if (to.path == "/login") return navigateTo("/")

    return
  }

  if (to.path == "/login" || to.path == "/create-account") return
  else return navigateTo("/login")
})
