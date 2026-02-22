import { Request, Response } from "express"
import { eq } from "drizzle-orm"
import { createHash } from "node:crypto"

import { db } from "../database"
import { refreshTokens, users } from "../db/schema"
import { AuthRequest, TokenInfo } from "../types/internal-types"

import AuthService from "../services/AuthService"
import { authenticate } from "../middleware/auth"

const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt")

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user = (
      await db.select().from(users).where(eq(users.username, username))
    )[0]

    if (user == null) throw new Error("Username/password incorrect")

    if (await bcrypt.compare(password, user.password)) {
      const tokenInfo: TokenInfo = {
        username: user.username,
        userId: user.id,
      }

      const accessToken = AuthService.generateAccessToken(tokenInfo)

      const refreshToken = AuthService.generateRefreshToken(tokenInfo)
      const hashedRefreshToken = createHash("sha256")
        .update(refreshToken)
        .digest("hex")

      const refreshTokenEntry: typeof refreshTokens.$inferInsert = {
        refreshToken: hashedRefreshToken,
        userId: user.id,
      }

      await db.insert(refreshTokens).values(refreshTokenEntry)

      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: tokenInfo.username,
      })
    } else res.status(400).send("Username/password incorrect")
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  try {
    const decodedRefreshTokenInfo = AuthService.verifyRefreshToken(refreshToken)

    const foundRefreshTokens = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.userId, decodedRefreshTokenInfo.userId))

    if (foundRefreshTokens.length === 0)
      throw new Error("Refresh token invalid")

    for (const tokenEntry of foundRefreshTokens) {
      if (
        createHash("sha256").update(refreshToken).digest("hex") ==
        tokenEntry.refreshToken
      ) {
        console.log("REfresh token: ", refreshToken)
        console.log("Found token: ", tokenEntry.refreshToken)
        const accessToken = AuthService.generateAccessToken(
          decodedRefreshTokenInfo,
        )
        const newRefreshToken = AuthService.generateRefreshToken(
          decodedRefreshTokenInfo,
        )

        const hashedNewRefreshToken = await createHash("sha256")
          .update(newRefreshToken)
          .digest("hex")

        await db
          .update(refreshTokens)
          .set({ refreshToken: hashedNewRefreshToken })
          .where(eq(refreshTokens.id, tokenEntry.id))

        res.json({
          accessToken: accessToken,
          refreshToken: newRefreshToken,
          username: decodedRefreshTokenInfo.username,
        })
      }
    }

    throw new Error("Refresh token invalid")
  } catch (error) {
    res.status(401).send(error)
  }
})

router.delete("/logout", async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  try {
    const decodedRefreshTokenInfo = AuthService.verifyRefreshToken(refreshToken)

    const foundRefreshTokens = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.userId, decodedRefreshTokenInfo.userId))

    if (foundRefreshTokens.length === 0)
      throw new Error("Refresh token invalid")

    for (const tokenEntry of foundRefreshTokens) {
      if (
        createHash("sha256").update(refreshToken).digest("hex") ==
        tokenEntry.refreshToken
      ) {
        console.log("REfresh token: ", refreshToken)
        console.log("Found token: ", tokenEntry.refreshToken)

        await db
          .delete(refreshTokens)
          .where(eq(refreshTokens.id, tokenEntry.id))

        res.status(200).send()
      }
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/verify", authenticate, async (req: AuthRequest, res: Response) => {
  res.json(req.user)
})

module.exports = router
