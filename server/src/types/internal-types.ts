import { Request } from "express"

export interface TokenInfo {
  username: string
  userId: number
  generatedByRefresh?: boolean
}

export interface AuthRequest extends Request {
  user?: TokenInfo
}
