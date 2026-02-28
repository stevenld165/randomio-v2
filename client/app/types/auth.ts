export interface TokenResponse {
  accessToken: string
  refreshToken: string
  username: string
}

export interface User {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  emailVerified: boolean
  name: string
  image?: string | null | undefined
}
