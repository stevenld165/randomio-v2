export default defineEventHandler(async (event) => {
  const refreshCookie = getCookie(event, "refresh_token") || ""
  console.log("asdfawefsfd")
  console.log(refreshCookie)

  return refreshCookie
})
