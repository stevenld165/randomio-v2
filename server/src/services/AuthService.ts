import jwt from "jsonwebtoken"

import { eq } from "drizzle-orm"

import { TokenInfo } from "../types/internal-types"
import { db } from "../database"
import { refreshTokens } from "../db/schema"

const bcrypt = require("bcrypt")

class AuthService {
  generateAccessToken = (tokenInfo: TokenInfo) => {
    const updatedInfo: TokenInfo = {
      ...tokenInfo,
      generatedByRefresh: false,
    }

    return jwt.sign(updatedInfo, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h",
    })
  }

  generateRefreshToken = (tokenInfo: TokenInfo) => {
    const updatedInfo: TokenInfo = {
      ...tokenInfo,
      generatedByRefresh: true,
    }

    return jwt.sign(updatedInfo, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "30d",
    })
  }

  verifyRefreshToken = (refreshToken: string) => {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as TokenInfo

    const decodedRefreshTokenInfoCleaned = {
      userId: decodedRefreshToken.userId,
      username: decodedRefreshToken.username,
    }

    return decodedRefreshTokenInfoCleaned
  }
}

export default new AuthService()
