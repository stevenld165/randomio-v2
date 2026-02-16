import { Request, Response } from "express"
import { eq } from "drizzle-orm"

const express = require("express")
const router = express.Router()

const bCrypt = require("bcrypt")

import { db } from "../database"
import { showListEntries, users } from "../db/schema"

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

router.post("/add", async (req: Request, res: Response) => {
  const { username, password } = req.body
})

module.exports = router
