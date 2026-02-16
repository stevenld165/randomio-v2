import { Request, Response } from "express"
import { eq } from "drizzle-orm"

const express = require("express")
const router = express.Router()

import { db } from "../database"
import { showListEntries } from "../db/schema"

router.get(
  "/:userId",
  async (req: Request<{ userId: number }>, res: Response) => {
    const userId = req.params.userId

    try {
      const userShowList = await db
        .select()
        .from(showListEntries)
        .where(eq(showListEntries.userId, userId))

      res.json(userShowList)
    } catch (error) {
      res.status(400).send(error)
    }
    res.json("meow")
  },
)

router.post("/add", async (req: Request, res: Response) => {
  const { imdbId, userId } = req.body

  try {
    const showListEntry: typeof showListEntries.$inferInsert = {
      userId: userId,
      imdbId: imdbId,
    }

    const dbInsert = await db
      .insert(showListEntries)
      .values(showListEntry)
      .returning()

    res.json(dbInsert)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/delete", async (req: Request, res: Response) => {
  const { entryId } = req.body

  try {
    const dbResponse = await db
      .delete(showListEntries)
      .where(eq(showListEntries.id, entryId))

    res.json(dbResponse)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch("/update-filters", async (req: Request, res: Response) => {
  const { entryId, excludedSeasons, extraEpisodes } = req.body

  try {
    const updatedFields: typeof showListEntries.$inferInsert = {
      excludedSeasons: excludedSeasons,
      extraEpisodes: extraEpisodes,
    }

    const dbResponse = await db
      .update(showListEntries)
      .set(updatedFields)
      .where(eq(showListEntries.id, entryId))

    res.json(dbResponse)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch("/toggle", async (req: Request, res: Response) => {
  const { entryId, enabled } = req.body

  try {
    const updatedFields: typeof showListEntries.$inferInsert = {
      enabled: enabled,
    }

    const dbResponse = await db
      .update(showListEntries)
      .set(updatedFields)
      .where(eq(showListEntries.id, entryId))

    res.json(dbResponse)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
