export interface TokenResponse {
  accessToken: string
  refreshToken: string
  username: string
}

export interface Identity {
  username: string
  userId: number
}
