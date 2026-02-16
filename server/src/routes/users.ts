import { Request, Response } from "express"
import { eq } from "drizzle-orm"
import { createHash } from "node:crypto"

import { db } from "../database"
import { refreshTokens, showListEntries, users } from "../db/schema"
import { TokenInfo } from "../types/internal-types"

import AuthService from "../services/AuthService"

const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get(
  "/:userId",
  async (req: Request<{ userId: number }>, res: Response) => {
    const userId = req.params.userId

    try {
      const user = await db
        .select({
          id: users.id,
          username: users.username,
        })
        .from(users)
        .where(eq(users.id, userId))

      res.json(user)
    } catch (error) {
      res.status(400).send(error)
    }
  },
)

router.post("/create", async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: typeof users.$inferInsert = {
      username: username,
      password: hashedPassword,
    }

    console.log(newUser)

    const dbResult = await db.insert(users).values(newUser).returning()

    res.json(dbResult[0]?.id)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
