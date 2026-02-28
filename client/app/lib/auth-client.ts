import { createAuthClient } from "better-auth/vue"
import { API_URL } from "~/constants/api"

export const authClient = createAuthClient({
  baseURL: API_URL,
})
