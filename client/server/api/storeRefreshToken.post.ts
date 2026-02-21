export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const refreshCookie = setCookie(event, "refresh_token", body.refreshToken, {
    httpOnly: true,
    sameSite: true,
    //secure: true,
  })

  console.log("JUST STORED NEW REFRESH COOKE")

  setResponseStatus(event, 200)
  return body.refreshToken
})
